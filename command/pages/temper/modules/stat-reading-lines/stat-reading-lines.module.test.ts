import { expect, test } from "bun:test"
import {
  chosenIn,
  readingLinesIn,
  shortIdOf,
} from "akasha/command/pages/temper/modules/stat-reading-lines/stat-reading-lines.module.code.ts"

function lineOf(id: string, capturedAt: number, bar = "frontBar"): string {
  return JSON.stringify({
    id,
    result: `result-${id}`,
    character: "Erin Solstice",
    buildHash: "hash",
    bar,
    reading: {
      capturedAt,
      inCombat: false,
      esoVersion: "101047",
      stats: { "health-maximum": 20000 },
      activeBuffs: {
        "2": { abilityId: 2, name: "Major Resolve" },
        "1": { abilityId: 1, name: "Minor Toughness" },
      },
      championPoints: { "1": { championSkillId: 12, points: 50, maxPoints: 50 } },
    },
  })
}

const BODY = [
  lineOf("01a155cc-9d70-0000", 300),
  lineOf("01a155aa-0001-0000", 100),
  lineOf("01a155bb-0002-0000", 200),
  lineOf("01a155bb-0003-0000", 200, "backBar"),
  "",
].join("\n")

test("a list kept by index reads as a list in index order, and lines read oldest first", () => {
  const { lines, unread } = readingLinesIn(BODY)
  expect(unread).toEqual([])
  expect(lines.map((one) => one.reading.capturedAt)).toEqual([100, 200, 200, 300])
  expect(lines[0]?.reading.activeBuffs?.map((one) => one.name)).toEqual([
    "Minor Toughness",
    "Major Resolve",
  ])
  expect(lines[0]?.reading.championPoints?.[0]?.points).toBe(50)
})

test("a line that does not read is kept aside with its number", () => {
  const { lines, unread } = readingLinesIn(`${lineOf("01a1", 1)}\nnot json\n{"id":"x"}\n`)
  expect(lines).toHaveLength(1)
  expect(unread.map((one) => one.line)).toEqual([2, 3])
  expect(unread[0]?.why).toBe("it is no JSON")
})

test("a line whose reading does not read says where", () => {
  const broken = JSON.parse(lineOf("01a1", 1)) as { reading: Record<string, unknown> }
  broken.reading["inCombat"] = "yes"
  const { unread } = readingLinesIn(JSON.stringify(broken))
  expect(unread[0]?.why).toContain("at `reading.inCombat`")
})

test("the newest readings are chosen, newest first", () => {
  const { lines } = readingLinesIn(BODY)
  const said = chosenIn(lines, { last: 2 })
  expect("chosen" in said && said.chosen.map((one) => one.id)).toEqual([
    "01a155cc-9d70-0000",
    "01a155bb-0003-0000",
  ])
})

test("a second captured at takes every bar captured then", () => {
  const { lines } = readingLinesIn(BODY)
  const said = chosenIn(lines, { last: 3, capturedAt: 200 })
  expect("chosen" in said && said.chosen.map((one) => one.bar)).toEqual(["backBar", "frontBar"])
  expect(chosenIn(lines, { last: 3, capturedAt: 7 })).toEqual({
    refused: "no reading was captured at 7",
  })
})

test("the start of an id names one reading, and a start fitting two is refused", () => {
  const { lines } = readingLinesIn(BODY)
  const said = chosenIn(lines, { last: 3, id: "01a155cc" })
  expect("chosen" in said && said.chosen.map((one) => one.reading.capturedAt)).toEqual([300])
  const both = chosenIn(lines, { last: 3, id: "01a155bb" })
  expect("refused" in both && both.refused).toContain("starts 2 readings' ids")
  expect(chosenIn(lines, { last: 3, id: "ff" })).toEqual({ refused: "no reading's id starts `ff`" })
})

test("no reading at all is refused, and an id is shortened to its first three groups", () => {
  expect(chosenIn([], { last: 0 })).toEqual({ refused: "at least one reading is shown" })
  expect(shortIdOf("01a155cc-9d70-7230-a7d4")).toBe("01a155cc-9d70-7230")
})

test("readings whose ids were minted in one millisecond are told apart by their short ids", () => {
  const minted = ["01a16f13-5f08-721c-bfd3", "01a16f13-5f08-7348-a62e", "01a16f13-5f08-7d51-a1f1"]
  const { lines } = readingLinesIn(minted.map((one, at) => lineOf(one, at)).join("\n"))
  for (const one of minted) {
    const said = chosenIn(lines, { last: 1, id: shortIdOf(one) })
    expect("chosen" in said && said.chosen.map((line) => line.id)).toEqual([one])
  }
})
