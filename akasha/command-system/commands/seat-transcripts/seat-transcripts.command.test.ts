import { expect, test } from "bun:test"
import type { Given } from "@akasha/command-system/calling"
import {
  type Held,
  saidOf,
  seatTranscripts,
  transcriptsOver,
} from "./seat-transcripts.command.code.ts"

const ROOT = "/nowhere"

function givenIn(): Given {
  return {
    root: ROOT,
    calledAs: "akasha seat-transcripts",
    from: ROOT,
    writer: null,
    agentId: null,
  }
}

const SEATS: readonly (readonly [string, string])[] = [
  ["01a00000-0000-7000-8000-00000000000a", "astra"],
  ["01a00000-0000-7000-8000-00000000000b", "borea"],
  ["01a00000-0000-7000-8000-00000000000c", "cirra"],
]

function holding(byId: Readonly<Record<string, string>>): (agentId: string) => Held {
  return (agentId) => {
    const said = byId[agentId]
    return said === undefined ? null : { value: said }
  }
}

test("each seat carries its agent id, its seat name and where its transcript stands", () => {
  const found = transcriptsOver(
    SEATS,
    holding({
      "01a00000-0000-7000-8000-00000000000a": "/home/one/a.jsonl",
      "01a00000-0000-7000-8000-00000000000b": "/home/one/b.jsonl",
      "01a00000-0000-7000-8000-00000000000c": "/home/one/c.jsonl",
    })
  )

  expect(found).toEqual([
    {
      agentId: "01a00000-0000-7000-8000-00000000000a",
      seatName: "astra",
      transcriptPath: "/home/one/a.jsonl",
    },
    {
      agentId: "01a00000-0000-7000-8000-00000000000b",
      seatName: "borea",
      transcriptPath: "/home/one/b.jsonl",
    },
    {
      agentId: "01a00000-0000-7000-8000-00000000000c",
      seatName: "cirra",
      transcriptPath: "/home/one/c.jsonl",
    },
  ])
})

test("a seat holding no transcript is left out rather than answered an empty path", () => {
  const found = transcriptsOver(
    SEATS,
    holding({ "01a00000-0000-7000-8000-00000000000b": "/home/one/b.jsonl" })
  )

  expect(found.map((one) => one.seatName)).toEqual(["borea"])
})

test("a seat holding an empty transcript path is left out the same way", () => {
  const found = transcriptsOver(
    SEATS,
    holding({
      "01a00000-0000-7000-8000-00000000000a": "",
      "01a00000-0000-7000-8000-00000000000b": "/home/one/b.jsonl",
      "01a00000-0000-7000-8000-00000000000c": "",
    })
  )

  expect(found.map((one) => one.seatName)).toEqual(["borea"])
})

test("a fleet holding nothing answers an empty list rather than nothing at all", () => {
  expect(transcriptsOver([], holding({}))).toEqual([])
  expect(JSON.parse(saidOf(transcriptsOver([], holding({}))))).toEqual({ seats: [] })
})

test("what is said is one object carrying the seats and nothing else", () => {
  const said = JSON.parse(
    saidOf(
      transcriptsOver(SEATS, holding({ "01a00000-0000-7000-8000-00000000000a": "/one.jsonl" }))
    )
  )

  expect(Object.keys(said)).toEqual(["seats"])
  expect(said.seats).toEqual([
    {
      agentId: "01a00000-0000-7000-8000-00000000000a",
      seatName: "astra",
      transcriptPath: "/one.jsonl",
    },
  ])
})

test("a word this does not take refuses as a fault in the call", () => {
  const said = seatTranscripts(["--json"], givenIn())

  expect(said.code).toBe(1)
  expect(said.report).toEqual([])
  expect(said.refusals[0]).toContain("`--json`")
})

test("a word carrying no dash is refused too, because this takes no word at all", () => {
  const said = seatTranscripts(["seats"], givenIn())

  expect(said.code).toBe(1)
  expect(said.refusals[0]).toContain("`seats`")
})

test("every word it was given is named rather than the first of them alone", () => {
  const said = seatTranscripts(["--json", "--counts"], givenIn())

  expect(said.refusals[0]).toContain("`--json`")
  expect(said.refusals[0]).toContain("`--counts`")
})

// THIS ARM IS WHAT PROVES THE HELPERS RESOLVE. Everything above drives a seeded reader, so it
// would pass with `@akasha/seat-system/seat-akasha-beside` misspelt into a module that is
// not there. This one calls the command, which reaches both helpers, so a bad specifier
// fails it at import.
test("a call naming nothing answers the seats the fleet holds now", () => {
  const said = seatTranscripts([], givenIn())

  expect(said.refusals).toEqual([])
  expect(said.code).toBe(0)
  expect(said.report.length).toBe(1)
  const held = JSON.parse(said.report[0] ?? "")

  expect(Array.isArray(held.seats)).toBe(true)
  for (const one of held.seats) {
    expect(typeof one.agentId).toBe("string")
    expect(typeof one.seatName).toBe("string")
    expect(typeof one.transcriptPath).toBe("string")
    expect(one.transcriptPath).not.toBe("")
  }
})
