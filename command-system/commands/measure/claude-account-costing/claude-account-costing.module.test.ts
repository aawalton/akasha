import { afterAll, expect, test } from "bun:test"
import { put } from "@akasha/testing-system/putting"
import { scratchWorld } from "../../../scratching/scratching.module.code.ts"
import {
  costOf,
  countedIn,
  linesOf,
  modelNamed,
  ratesFor,
  sinceOf,
  storeIn,
  totalOf,
} from "./claude-account-costing.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const INSIDE = "2026-09-03T12:00:00.000Z"
const OUTSIDE = "2026-07-01T12:00:00.000Z"
const UNTIL = Date.parse("2026-09-03T18:00:00.000Z")
const SINCE = sinceOf(UNTIL, 30)

function usageOf(input: number, output: number, read: number, short: number, long: number): object {
  return {
    input_tokens: input,
    output_tokens: output,
    cache_read_input_tokens: read,
    cache_creation_input_tokens: short + long,
    cache_creation: { ephemeral_5m_input_tokens: short, ephemeral_1h_input_tokens: long },
  }
}

function callLine(id: string, model: string, at: string, usage: object): string {
  return JSON.stringify({
    type: "assistant",
    timestamp: at,
    message: { id, model, content: [], usage },
  })
}

test("a model naming the day it was released is priced as the model", () => {
  expect(modelNamed("claude-haiku-4-5-20251001")).toBe("claude-haiku-4-5")
  expect(modelNamed("claude-opus-5")).toBe("claude-opus-5")
  expect(ratesFor("claude-haiku-4-5-20251001")).toEqual(ratesFor("claude-haiku-4-5"))
})

test("a model this holds no price for answers no rates", () => {
  expect(ratesFor("claude-nothing-9")).toBeNull()
})

test("each class of token is priced by its own rate", () => {
  const rates = { input: 5, write5m: 6.25, write1h: 10, read: 0.5, output: 25 }
  const tokens = { input: 1e6, write5m: 1e6, write1h: 1e6, read: 1e6, output: 1e6, calls: 1 }

  expect(costOf(tokens, rates)).toBeCloseTo(46.75, 6)
})

test("the two fable models part on what a cache hit costs", () => {
  const older = ratesFor("claude-fable-5")
  const newer = ratesFor("claude-fable-5-1")

  expect(older?.read).toBe(1)
  expect(newer?.read).toBe(0.25)
})

test("a call written down in two transcripts is counted once", () => {
  const root = scratch.rootFor("costing-dupe-")
  const line = callLine("msg-a", "claude-opus-5", INSIDE, usageOf(0, 0, 1e6, 0, 0))
  put(root, "one.jsonl", `${line}\n`)
  put(root, "subagents/two.jsonl", `${line}\n`)

  const counted = countedIn(root, SINCE, UNTIL)

  expect(counted.files).toBe(2)
  expect(counted.byModel.get("claude-opus-5")?.calls).toBe(1)
  expect(totalOf(counted)).toBeCloseTo(0.5, 6)
})

test("a call a subagent made is counted with the rest", () => {
  const root = scratch.rootFor("costing-sub-")
  put(
    root,
    "one.jsonl",
    `${callLine("msg-a", "claude-opus-5", INSIDE, usageOf(0, 1e6, 0, 0, 0))}\n`
  )
  put(
    root,
    "subagents/two.jsonl",
    `${callLine("msg-b", "claude-opus-5", INSIDE, usageOf(0, 1e6, 0, 0, 0))}\n`
  )

  const counted = countedIn(root, SINCE, UNTIL)

  expect(counted.byModel.get("claude-opus-5")?.calls).toBe(2)
  expect(totalOf(counted)).toBeCloseTo(50, 6)
})

test("a call before the window is left out", () => {
  const root = scratch.rootFor("costing-window-")
  put(
    root,
    "one.jsonl",
    `${callLine("msg-a", "claude-opus-5", OUTSIDE, usageOf(0, 1e6, 0, 0, 0))}\n`
  )

  const counted = countedIn(root, SINCE, UNTIL)

  expect(counted.byModel.size).toBe(0)
  expect(totalOf(counted)).toBe(0)
})

test("a cache write stating no life is priced as the shorter one", () => {
  const root = scratch.rootFor("costing-life-")
  const usage = {
    input_tokens: 0,
    output_tokens: 0,
    cache_read_input_tokens: 0,
    cache_creation_input_tokens: 1e6,
  }
  put(root, "one.jsonl", `${callLine("msg-a", "claude-opus-5", INSIDE, usage)}\n`)

  const counted = countedIn(root, SINCE, UNTIL)

  expect(counted.byModel.get("claude-opus-5")?.write5m).toBe(1e6)
  expect(totalOf(counted)).toBeCloseTo(6.25, 6)
})

test("a model this holds no price for is named rather than counted at nothing", () => {
  const root = scratch.rootFor("costing-unpriced-")
  put(
    root,
    "one.jsonl",
    `${callLine("msg-a", "claude-nothing-9", INSIDE, usageOf(0, 1e6, 0, 0, 0))}\n`
  )

  const counted = countedIn(root, SINCE, UNTIL)

  expect(counted.unpriced).toEqual(["claude-nothing-9"])
  expect(totalOf(counted)).toBe(0)
  expect(linesOf(counted, 30).some((one) => one.includes("claude-nothing-9"))).toBe(true)
})

test("a call moving no token at all is no call to the api", () => {
  const root = scratch.rootFor("costing-empty-")
  put(root, "one.jsonl", `${callLine("msg-a", "<synthetic>", INSIDE, usageOf(0, 0, 0, 0, 0))}\n`)

  const counted = countedIn(root, SINCE, UNTIL)

  expect(counted.unpriced).toEqual([])
  expect(counted.byModel.size).toBe(0)
})

test("the transcripts sit under projects in the config dir", () => {
  expect(storeIn("/home/one/.claude")).toBe("/home/one/.claude/projects")
})

test("what is said closes with the total", () => {
  const root = scratch.rootFor("costing-lines-")
  put(
    root,
    "one.jsonl",
    `${callLine("msg-a", "claude-opus-5", INSIDE, usageOf(0, 1e6, 0, 0, 0))}\n`
  )

  const said = linesOf(countedIn(root, SINCE, UNTIL), 30)

  expect(said[0]).toContain("claude-opus-5")
  expect(said[1]).toContain("total")
  expect(said[1]).toContain("25.00")
})
