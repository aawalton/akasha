import { expect, test } from "bun:test"
import { appendFileSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  exchangesIn,
  followed,
  NOTHING_SCANNED,
  type Scanned,
  saidOf,
  scannedAfter,
  scanning,
  seatTranscriptFollow,
} from "akasha/command/pages/seat/transcript-follow/seat-transcript-follow.command.code.ts"

const SCRATCH_AT = "/var/tmp"

const ROOT = "/nowhere"

const SCRATCH_NAME = "akasha-seat-transcript-follow-"

function givenIn(): Given {
  return {
    root: ROOT,
    calledAs: "akasha seat transcript-follow",
    from: ROOT,
    writer: null,
    agentId: null,
  }
}

function asked(uuid: string, said: string, aside = false): string {
  return JSON.stringify({
    type: "user",
    uuid,
    isSidechain: aside,
    message: { role: "user", content: said },
  })
}

function answeredWith(text: string, aside = false): string {
  return JSON.stringify({
    type: "assistant",
    isSidechain: aside,
    message: { role: "assistant", content: [{ type: "text", text }] },
  })
}

const THINKING = JSON.stringify({
  type: "assistant",
  isSidechain: false,
  message: {
    role: "assistant",
    content: [
      { type: "thinking", thinking: "quietly" },
      { type: "tool_use", name: "Bash", input: { command: "ls" } },
    ],
  },
})

const TOOL_ANSWER = JSON.stringify({
  type: "user",
  isSidechain: false,
  message: { role: "user", content: [{ type: "tool_result", content: "listed" }] },
})

function linesOf(every: readonly string[]): string {
  return every.map((line) => `${line}\n`).join("")
}

const TWO = linesOf([
  asked("u1", "hello"),
  answeredWith("hi"),
  asked("u2", "again"),
  answeredWith("there"),
])

test("an exchange names the turn a person wrote, what was said and what was answered", () => {
  expect(exchangesIn(TWO, null)).toEqual([
    { uuid: "u1", said: "hello", replied: "hi" },
    { uuid: "u2", said: "again", replied: "there" },
  ])
})

test("a cursor takes away every exchange up to the turn that uuid names", () => {
  expect(exchangesIn(TWO, "u1")).toEqual([{ uuid: "u2", said: "again", replied: "there" }])
  expect(exchangesIn(TWO, "u2")).toEqual([])
})

test("a uuid no turn names takes nothing out of the answer", () => {
  expect(exchangesIn(TWO, "u9").map((one) => one.uuid)).toEqual(["u1", "u2"])
})

test("a sidechain turn and a sidechain answer are part of no exchange", () => {
  const text = linesOf([
    asked("u1", "hello"),
    asked("s1", "go and look", true),
    answeredWith("what the subagent wrote", true),
    answeredWith("hi"),
  ])

  expect(exchangesIn(text, null)).toEqual([{ uuid: "u1", said: "hello", replied: "hi" }])
})

test("thinking, a tool call and a tool answer are no part of what the agent wrote", () => {
  const text = linesOf([asked("u1", "hello"), THINKING, TOOL_ANSWER, answeredWith("done")])

  expect(exchangesIn(text, null)).toEqual([{ uuid: "u1", said: "hello", replied: "done" }])
})

test("a last turn with nothing written back yet is answered nowhere", () => {
  const text = linesOf([asked("u1", "hello"), answeredWith("hi"), asked("u2", "again"), THINKING])

  expect(exchangesIn(text, null).map((one) => one.uuid)).toEqual(["u1"])
})

test("a scan goes on from where the scan before it ended", () => {
  const from: number[] = []
  const reading = (at: number, upTo: number): Scanned => {
    from.push(at)
    return { readTo: upTo, text: `${at}-${upTo}\n` }
  }
  const first = scannedAfter(NOTHING_SCANNED, 6, reading)
  const next = scannedAfter(first, 12, reading)

  expect(from).toEqual([0, 6])
  expect(next).toEqual({ readTo: 12, text: "0-6\n6-12\n" })
})

test("a file shorter than it was at the scan before is scanned again from its first byte", () => {
  const from: number[] = []
  const reading = (at: number, upTo: number): Scanned => {
    from.push(at)
    return { readTo: upTo, text: "fresh\n" }
  }
  const scanned = scannedAfter({ readTo: 900, text: "what was there before\n" }, 12, reading)

  expect(from).toEqual([0])
  expect(scanned).toEqual({ readTo: 12, text: "fresh\n" })
})

test("a line written only partway is left for the scan after it", () => {
  const dir = mkdtempSync(join(SCRATCH_AT, SCRATCH_NAME))
  try {
    const path = join(dir, "seat.jsonl")
    const reply = answeredWith("hi")
    writeFileSync(path, `${linesOf([asked("u1", "hello")])}${reply.slice(0, 20)}`)
    const scan = scanning(() => path)

    expect(exchangesIn(scan(), null)).toEqual([])

    writeFileSync(path, linesOf([asked("u1", "hello"), reply]))

    expect(exchangesIn(scan(), null)).toEqual([{ uuid: "u1", said: "hello", replied: "hi" }])
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test("a transcript written over shorter is followed from its first byte again", () => {
  const dir = mkdtempSync(join(SCRATCH_AT, SCRATCH_NAME))
  try {
    const path = join(dir, "seat.jsonl")
    writeFileSync(path, TWO)
    const scan = scanning(() => path)

    expect(exchangesIn(scan(), null).map((one) => one.uuid)).toEqual(["u1", "u2"])

    writeFileSync(path, linesOf([asked("u3", "fresh"), answeredWith("ok")]))

    expect(exchangesIn(scan(), null).map((one) => one.uuid)).toEqual(["u3"])
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test("a seat pointed at another file is followed there rather than at the file before", () => {
  const dir = mkdtempSync(join(SCRATCH_AT, SCRATCH_NAME))
  try {
    const first = join(dir, "first.jsonl")
    const second = join(dir, "second.jsonl")
    writeFileSync(first, TWO)
    writeFileSync(second, linesOf([asked("u3", "fresh"), answeredWith("ok")]))
    let at = first
    const scan = scanning(() => at)

    expect(exchangesIn(scan(), null).map((one) => one.uuid)).toEqual(["u1", "u2"])

    at = second

    expect(exchangesIn(scan(), null).map((one) => one.uuid)).toEqual(["u3"])
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test("a wait that elapses is answered an empty list rather than a refusal", async () => {
  const dir = mkdtempSync(join(SCRATCH_AT, SCRATCH_NAME))
  try {
    const path = join(dir, "seat.jsonl")
    writeFileSync(path, linesOf([asked("u1", "hello")]))

    expect(await followed(() => path, null, 150, 10)).toEqual([])
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test("an exchange finished while the call waits is answered before the wait elapses", async () => {
  const dir = mkdtempSync(join(SCRATCH_AT, SCRATCH_NAME))
  try {
    const path = join(dir, "seat.jsonl")
    writeFileSync(path, linesOf([asked("u1", "hello")]))
    const waiting = followed(() => path, null, 4000, 10)
    setTimeout(() => appendFileSync(path, linesOf([answeredWith("hi")])), 50)

    expect(await waiting).toEqual([{ uuid: "u1", said: "hello", replied: "hi" }])
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test("an exchange already there is answered at once rather than waited for", async () => {
  const dir = mkdtempSync(join(SCRATCH_AT, SCRATCH_NAME))
  try {
    const path = join(dir, "seat.jsonl")
    writeFileSync(path, TWO)

    expect(await followed(() => path, "u1", 150, 10)).toEqual([
      { uuid: "u2", said: "again", replied: "there" },
    ])
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})

test("what is said is a JSON object naming the exchanges and nothing else", () => {
  const said = JSON.parse(saidOf([{ uuid: "u1", said: "hello", replied: "hi" }]))

  expect(Object.keys(said)).toEqual(["exchanges"])
  expect(said.exchanges).toEqual([{ uuid: "u1", said: "hello", replied: "hi" }])
  expect(JSON.parse(saidOf([]))).toEqual({ exchanges: [] })
})

test("a call naming no seat is refused", async () => {
  const said = await seatTranscriptFollow([], givenIn())

  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals.join("\n")).toContain("--seat")
})

test("a seat akasha files nothing under is refused as a fault of the call", async () => {
  const said = await seatTranscriptFollow(["--seat", "no-seat-of-this-name"], givenIn())

  expect(said.code).toBe(1)
  expect(said.refusals.join("\n")).toContain("`no-seat-of-this-name`")
})
