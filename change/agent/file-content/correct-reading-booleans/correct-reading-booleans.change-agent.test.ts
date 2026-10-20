import { expect, test } from "bun:test"
import { correctReadingBooleansCommand } from "akasha/change/agent/file-content/correct-reading-booleans/correct-reading-booleans.change-agent.code.ts"
import { NOTHING_OVER, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { resultOf } from "akasha/temper/player/character/stat/modules/build-reading-lines/build-reading-lines.module.code.ts"

const READINGS_AT =
  "temper/player/character/temper-account-character/pages/erin/erin.temper-account-character.readings.jsonl"

const PASSIVE_AT =
  "temper/catalog/champion-point/temper-champion-star/pages/precision.temper-champion-star.ts"

const SLOTTED_AT =
  "temper/catalog/champion-point/temper-champion-star/pages/rejuvenation.temper-champion-star.ts"

const PASSIVE = "export const precision = {\n  esoChampionSkillId: 11,\n}\n"

const SLOTTED =
  "export const rejuvenation = {\n  esoChampionSkillId: 35,\n  isSlottable: true,\n}\n"

function lineOf(id: string, capturedAt: number, reading: Record<string, unknown>) {
  const one = {
    character: "Erin",
    buildHash: "ATQI",
    bar: "backBar",
    reading: { capturedAt, ...reading },
  }
  return JSON.stringify({ id, result: resultOf(one), ...one })
}

const STARS = [
  { championSkillId: 11, points: 50, slottable: true },
  { championSkillId: 35, points: 50, slottable: true },
  { championSkillId: 999, points: 10, slottable: true },
]

const UNBACKED = lineOf("01a1aaaa", 1, { inArchive: true, archiveBoons: [], championPoints: [] })

const BACKED = lineOf("01a1bbbb", 2, {
  inArchive: true,
  archiveBoons: { "1": { abilityId: 7001, kind: "verse" } },
  championPoints: [],
})

const BUFFED = lineOf("01a1cccc", 3, {
  inArchive: true,
  activeBuffs: [{ abilityId: 7001, name: "a verse held" }],
  championPoints: [],
})

const OUTSIDE = lineOf("01a1dddd", 4, { inArchive: false, stars: 1, championPoints: [] })

const AS_LUA_HOLDS = Object.fromEntries(STARS.map((star, at) => [String(at + 1), star]))

const STARRED = lineOf("01a1eeee", 5, { inArchive: false, championPoints: AS_LUA_HOLDS })

const READINGS = `${[UNBACKED, BACKED, BUFFED, OUTSIDE, STARRED].join("\n")}\n`

function worldOf(readings: string): World {
  const texts: Record<string, string> = {
    [READINGS_AT]: readings,
    [PASSIVE_AT]: PASSIVE,
    [SLOTTED_AT]: SLOTTED,
  }
  return {
    root: "/nowhere",
    index: {} as World["index"],
    textOf: (path) => texts[path] ?? null,
    bodyOf: () => null,
    under: (folder) => Object.keys(texts).filter((path) => path.startsWith(folder)),
    base: () => null,
    over: NOTHING_OVER,
  }
}

function writtenOf(said: ReturnType<typeof correctReadingBooleansCommand>): readonly string[] {
  const one = said.edits[0]
  if (one?.kind !== "replace") return []
  return one.contentTo.split("\n").filter((line) => line !== "")
}

test("an Archive flag no evidence backs is taken out, and the line's result follows", () => {
  const said = correctReadingBooleansCommand(worldOf(READINGS))
  const line = JSON.parse(writtenOf(said)[0] ?? "{}")

  expect(said.refused).toBeNull()
  expect("inArchive" in line.reading).toBe(false)
  expect(line.result).toBe(resultOf(line))
})

test("an Archive flag kept by a boon, or by a buff with a boon's ability, stays", () => {
  const written = writtenOf(correctReadingBooleansCommand(worldOf(READINGS)))

  expect(written[1]).toBe(BACKED)
  expect(written[2]).toBe(BUFFED)
  expect(written[3]).toBe(OUTSIDE)
})

test("a star's slottable is the catalog's, and a star the catalog lacks keeps its own", () => {
  const written = writtenOf(correctReadingBooleansCommand(worldOf(READINGS)))
  const stars: Record<string, { slottable: boolean }> = JSON.parse(written[4] ?? "{}").reading
    .championPoints

  expect(Object.values(stars).map((star) => star.slottable)).toEqual([false, true, true])
})

test("the change says what it did", () => {
  const said = correctReadingBooleansCommand(worldOf(READINGS))

  expect(said.told).toEqual([
    "2 lines changed in 1 readings files",
    "inArchive true in 3 readings: 1 taken out, 2 kept on Archive evidence",
    "slottable set from the catalog on 1 stars, 1 stars the catalog lacks left as read",
    "0 lines repeating an earlier line's capture and result taken out",
  ])
})

test("a line the correction makes repeat an earlier line's capture is taken out", () => {
  const again = lineOf("01a1abab", 1, { archiveBoons: [], championPoints: [] })
  const said = correctReadingBooleansCommand(worldOf(`${UNBACKED}\n${again}\n`))

  expect(said.refused).toBeNull()
  expect(writtenOf(said).map((line) => JSON.parse(line).id)).toEqual(["01a1aaaa"])
  expect(said.told?.[3]).toBe(
    "1 lines repeating an earlier line's capture and result taken out: 01a1abab"
  )
})

test("readings holding nothing to correct are left alone", () => {
  const said = correctReadingBooleansCommand(worldOf(`${OUTSIDE}\n`))

  expect(said.edits).toEqual([])
})

test("two lines the correction makes the same are refused", () => {
  const twin = lineOf("01a1ffff", 9, { archiveBoons: [], championPoints: [] })
  const said = correctReadingBooleansCommand(worldOf(`${UNBACKED}\n${twin}\n`))

  expect(said.refused ?? "").toMatch(/^1 pairs .* a result lands once: 01a1aaaa and 01a1ffff$/)
})
