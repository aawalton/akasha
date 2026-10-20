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
