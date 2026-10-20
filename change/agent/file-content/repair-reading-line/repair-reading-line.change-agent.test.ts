import { expect, test } from "bun:test"
import { repairReadingLineCommand } from "akasha/change/agent/file-content/repair-reading-line/repair-reading-line.change-agent.code.ts"
import { NOTHING_OVER, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { resultOf } from "akasha/temper/player/character/stat/modules/build-reading-lines/build-reading-lines.module.code.ts"

const CHARACTER_AT =
  "temper/player/character/temper-account-character/pages/erin/erin.temper-account-character.ts"

const READINGS_AT =
  "temper/player/character/temper-account-character/pages/erin/erin.temper-account-character.readings.jsonl"

function lineOf(id: string, buildHash: string, bar: string, magicka: number) {
  const one = { character: "Erin", buildHash, bar, reading: { capturedAt: 1, stats: { magicka } } }
  return { id, result: resultOf(one), ...one }
}

const FITTING = lineOf("01a1aaaa-0000-7000-8000-000000000001", "ATQI", "backBar", 15100)

const MISPAIRED = lineOf("01a1bbbb-0000-7000-8000-000000000002", "ATQJ", "backBar", 15200)

const REPEATING = lineOf("01a1bbbc-0000-7000-8000-000000000003", "ATQJ", "backBar", 15100)

const FRONT = lineOf("01a1cccc-0000-7000-8000-000000000004", "ATQK", "frontBar", 12000)

const READINGS = `${[FITTING, MISPAIRED, REPEATING, FRONT].map((one) => JSON.stringify(one)).join("\n")}\n`

const WORLD: World = {
  root: "/nowhere",
  index: Object.assign({} as World["index"], {
    listedAt: (kind: string, slug: string) =>
      kind === "temper-account-character" && slug === "erin" ? [{ path: CHARACTER_AT }] : [],
  }),
  textOf: (path) => (path === READINGS_AT ? READINGS : null),
  bodyOf: () => null,
  under: () => [],
  base: () => null,
  over: NOTHING_OVER,
}

function writtenOf(said: ReturnType<typeof repairReadingLineCommand>): readonly string[] {
  const one = said.edits[0]
  if (one?.kind !== "replace") return []
  return READINGS.replace(one.contentFrom, one.contentTo)
    .split("\n")
    .filter((line) => line !== "")
}

test("a reading named with no source is taken out", () => {
  const said = repairReadingLineCommand(WORLD, { character: "erin", reading: "01a1bbbb" })

  expect(said.refused).toBeNull()
  expect(writtenOf(said).map((line) => JSON.parse(line).id)).toEqual([
    FITTING.id,
    REPEATING.id,
    FRONT.id,
  ])
})

test("a reading named with a source takes that line's build hash and its own result", () => {
  const said = repairReadingLineCommand(WORLD, {
    character: "erin",
    reading: "01a1bbbb",
    from: "01a1aaaa",
  })
  const repaired = JSON.parse(writtenOf(said)[1] ?? "{}")

  expect(said.refused).toBeNull()
  expect(repaired.buildHash).toBe("ATQI")
  expect(repaired.result).toBe(resultOf({ ...MISPAIRED, buildHash: "ATQI" }))
  expect(Object.keys(repaired)).toEqual(Object.keys(MISPAIRED))
})

test("a pick matching more than one line is refused", () => {
  const said = repairReadingLineCommand(WORLD, { character: "erin", reading: "01a1bb" })

  expect(said.refused ?? "").toMatch(/names 2 readings/)
})

test("a pick matching no line is refused", () => {
  const said = repairReadingLineCommand(WORLD, { character: "erin", reading: "01a1ffff" })

  expect(said.refused ?? "").toMatch(/holds no reading/)
})

test("a re-pair whose result is held already is refused", () => {
  const said = repairReadingLineCommand(WORLD, {
    character: "erin",
    reading: "01a1bbbc",
    from: "01a1aaaa",
  })

  expect(said.refused ?? "").toMatch(/a result lands once/)
})

test("a source reading the other bar is refused", () => {
  const said = repairReadingLineCommand(WORLD, {
    character: "erin",
    reading: "01a1bbbb",
    from: "01a1cccc",
  })

  expect(said.refused ?? "").toMatch(/reads the frontBar/)
})

const REMOVED_AT =
  "temper/player/character/temper-account-character/pages/erin/erin.temper-account-character.removed-readings.jsonl"

const PAGE = 'export const erin = {\n  slug: "erin",\n  readings: "jsonl",\n}\n'

function worldWith(texts: Readonly<Record<string, string>>): World {
  return { ...WORLD, textOf: (path) => texts[path] ?? null }
}

test("a line taken out has its capture recorded, and the page names the record", () => {
  const world = worldWith({ [READINGS_AT]: READINGS, [CHARACTER_AT]: PAGE })
  const said = repairReadingLineCommand(world, { character: "erin", reading: "01a1bbbb" })

  expect(said.refused).toBeNull()
  expect(said.edits[1]).toEqual({
    kind: "add",
    path: REMOVED_AT,
    content: `${JSON.stringify({ id: MISPAIRED.id, bar: "backBar", capturedAt: 1 })}\n`,
  })
  const page = said.edits[2]
  expect(page?.kind === "replace" ? page.contentTo : "").toContain('removedReadings: "jsonl",')
})

test("a capture taken out beside a record held is put after it", () => {
  const held = `${JSON.stringify({ id: "01a1dddd", bar: "frontBar", capturedAt: 7 })}\n`
  const world = worldWith({ [READINGS_AT]: READINGS, [REMOVED_AT]: held })
  const said = repairReadingLineCommand(world, { character: "erin", reading: "01a1bbbb" })

  expect(said.edits.map((one) => one.kind)).toEqual(["replace", "append"])
})

test("a capture already taken out is recorded by its bar and instant", () => {
  const said = repairReadingLineCommand(WORLD, {
    character: "erin",
    reading: "01a1eeee-0000-7000-8000-000000000005",
    bar: "frontBar",
    "captured-at": "9",
  })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([
    {
      kind: "add",
      path: REMOVED_AT,
      content: `${JSON.stringify({ id: "01a1eeee-0000-7000-8000-000000000005", bar: "frontBar", capturedAt: 9 })}\n`,
    },
  ])
})

test("a capture a line still holds is refused as already taken out", () => {
  const said = repairReadingLineCommand(WORLD, {
    character: "erin",
    reading: "01a1ffff",
    bar: "frontBar",
    "captured-at": "1",
  })

  expect(said.refused ?? "").toMatch(/holds that capture still/)
})
