import { expect, test } from "bun:test"
import {
  busyOn,
  cancelWatch,
} from "akasha/agent/seat/observation/seat-turn/modules/prompt-cancel/prompt-cancel.module.code.ts"
import type { TurnWorking } from "akasha/agent/seat/observation/seat-turn/modules/reading/seat-turn-reading.computed-property-module.code.ts"
import { promptUnanswered } from "akasha/agent/seat/observation/seat-turn/modules/turn-working/turn-working.module.code.ts"

const AGENT = "01a183b2-f232-713a-8949-9f6a7cd9c6d6"

const PROMPT = JSON.stringify({ type: "user", message: { role: "user", content: "do the thing" } })

const ANSWER = JSON.stringify({
  type: "assistant",
  message: { stop_reason: "end_turn", content: [{ type: "text", text: "done" }] },
})

function watchOver(opts: {
  working?: () => TurnWorking
  awaiting?: boolean
  busy: (boolean | null)[]
  cleared: string[]
}): () => Promise<undefined> {
  let at = 0
  const watched = cancelWatch({
    readWorking: opts.working ?? (() => ({ activeTurn: true, scannedTo: 100 })),
    readAwaiting: () => opts.awaiting ?? true,
    readBusy: () => {
      const one = opts.busy[Math.min(at, opts.busy.length - 1)] ?? null
      at += 1
      return Promise.resolve(one)
    },
    clear: (agent) => {
      opts.cleared.push(agent)
      return undefined
    },
  })
  return () => watched(AGENT)
}

test("a screen saying esc to interrupt near its bottom is busy", () => {
  expect(busyOn("old words\n\n✻ Thinking… (12s · esc to interrupt)\n> \n")).toBe(true)
})

test("a screen without it is not busy", () => {
  expect(busyOn("old words\n> do the thing\n")).toBe(false)
})

test("the words high up the screen do not make it busy", () => {
  const filler = Array.from({ length: 20 }, (_, one) => `line ${one}`).join("\n")
  expect(busyOn(`esc to interrupt\n${filler}\n> \n`)).toBe(false)
})

test("a prompt with nothing after it is unanswered", () => {
  expect(promptUnanswered(`${ANSWER}\n${PROMPT}\n`)).toBe(true)
})

test("a prompt answered is not unanswered", () => {
  expect(promptUnanswered(`${PROMPT}\n${ANSWER}\n`)).toBe(false)
})

test("a quiet screen over an unanswered prompt twice running ends the turn", async () => {
  const cleared: string[] = []
  const tick = watchOver({ busy: [false], cleared })
  await tick()
  expect(cleared).toEqual([])
  await tick()
  expect(cleared).toEqual([AGENT])
})

test("a busy screen ends nothing", async () => {
  const cleared: string[] = []
  const tick = watchOver({ busy: [true], cleared })
  for (let one = 0; one < 5; one += 1) await tick()
  expect(cleared).toEqual([])
})

test("a screen that cannot be read ends nothing", async () => {
  const cleared: string[] = []
  const tick = watchOver({ busy: [null], cleared })
  for (let one = 0; one < 5; one += 1) await tick()
  expect(cleared).toEqual([])
})

test("a busy read between quiet reads starts the count again", async () => {
  const cleared: string[] = []
  const tick = watchOver({ busy: [false, true, false], cleared })
  await tick()
  await tick()
  await tick()
  expect(cleared).toEqual([])
  await tick()
  expect(cleared).toEqual([AGENT])
})

test("a transcript that grew between quiet reads ends nothing yet", async () => {
  const cleared: string[] = []
  let scannedTo = 100
  const tick = watchOver({
    busy: [false],
    cleared,
    working: () => ({ activeTurn: true, scannedTo }),
  })
  await tick()
  scannedTo = 200
  await tick()
  expect(cleared).toEqual([])
})

test("a seat already idle or past its prompt ends nothing", async () => {
  const cleared: string[] = []
  const idle = watchOver({ busy: [false], cleared, working: () => ({ activeTurn: false }) })
  await idle()
  await idle()
  const answered = watchOver({ busy: [false], cleared, awaiting: false })
  await answered()
  await answered()
  expect(cleared).toEqual([])
})
