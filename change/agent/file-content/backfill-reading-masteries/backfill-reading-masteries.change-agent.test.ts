import { expect, test } from "bun:test"
import { backfillReadingMasteries } from "akasha/change/agent/file-content/backfill-reading-masteries/backfill-reading-masteries.change-agent.code.ts"
import { worldUnder as worldOf } from "akasha/change/test-fixtures/shadow-world/shadow-world.test-fixture.code.ts"
import { decodeBuild } from "akasha/temper/player/character/build/build-codec/modules/build-codec/build-codec.module.code.ts"
import { base64urlToBytes } from "akasha/temper/player/character/build/build-hash/modules/build-hash-base64url/build-hash-base64url.module.code.ts"
import { holdSetCatalogFromCheckout } from "akasha/temper/player/character/characters-equipment/modules/sets-all/sets-all.module.test-fixtures.ts"
import { buildHash } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { holdSkillCatalogFromCheckout } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.test-fixtures.ts"
import { resultOf } from "akasha/temper/player/character/stat/modules/build-reading-lines/build-reading-lines.module.code.ts"

holdSetCatalogFromCheckout()
holdSkillCatalogFromCheckout()

const READINGS_AT =
  "temper/player/character/temper-account-character/pages/stalker/stalker.temper-account-character.readings.jsonl"

const CASE_AT =
  "temper/player/character/stat/temper-stat-case/pages/stalker-front-bar/stalker-front-bar.temper-stat-case.verified-stats.json"

const SAVED_AT_MINOR_TEN =
  "ATQKcorAAIBihYxC4RtACFvVaACLWe25EWs9tyItZ7bkRaz23Ii1ntuQgvVbchBeq25CDYetyIGj1W3LgAAAAAAAALZgAAAAAabgoggETopRJwCsRgYIEiAbg0DYBoCQziTVCiZUGwAZJxPggDhHBDhChCRAQGRGZGJARAZGpGBGRmIAREBkAAhmRGB0ZGB0REyEZkZABFBERFRmRERkda7GfKakWJMrHky5pcybOz6NOrXtn0KNKnU8VVkdWvNnj65egYskLRE2RunaRKmTv1CmCqhK46wwcNkjYEqWBGAYQKGMmg4gSbOChYwaOHkCJI6TjAAZBvDJJ4A"

const HELD = [{ abilityId: 263605 }, { abilityId: 45060 }, { abilityId: 263604 }]

function lineOf(id: string, capturedAt: number, classPassives?: readonly unknown[]): string {
  const reading = {
    capturedAt,
    stats: { "critical-damage": 57 },
    ...(classPassives === undefined ? {} : { classPassives }),
  }
  const one = { character: "Stalker", buildHash: SAVED_AT_MINOR_TEN, bar: "frontBar", reading }
  return JSON.stringify({ id, result: resultOf(one), ...one })
}

const HOLDING = lineOf("01a1aaaa", 7, HELD)

const BEFORE_PASSIVES = lineOf("01a1bbbb", 8)

const CASE = `${JSON.stringify(
  {
    character: "stalker",
    bar: "primary-weapon-bar",
    buildHash: SAVED_AT_MINOR_TEN,
    capturedAt: 7,
    pinned: { "critical-damage": 57 },
    gaps: { "bash-damage": 444 },
  },
  null,
  2
)}\n`

function contentAt(said: ReturnType<typeof backfillReadingMasteries>, path: string): string {
  const one = said.edits.find((edit) => edit.kind === "replace" && edit.path === path)
  return one?.kind === "replace" ? one.contentTo : ""
}

test("a reading holding class masteries takes a minor-fourteen hash choosing them", () => {
  const said = backfillReadingMasteries(worldOf({ [READINGS_AT]: `${HOLDING}\n` }))
  const line = JSON.parse(contentAt(said, READINGS_AT).split("\n")[0] ?? "{}")
  expect(base64urlToBytes(line.buildHash)?.[2]).toBe(14)
  expect(decodeBuild(buildHash(line.buildHash))?.masteries).toEqual([
    "an-eye-for-exploitation",
    "above-and-beyond",
  ])
  expect(line.result).toBe(resultOf(line))
  expect({ ...line, buildHash: "", result: "" }).toEqual({
    ...JSON.parse(HOLDING),
    buildHash: "",
    result: "",
  })
})

test("a reading holding no class mastery is left as it is", () => {
  const said = backfillReadingMasteries(worldOf({ [READINGS_AT]: `${BEFORE_PASSIVES}\n` }))
  expect(said.edits).toEqual([])
})

test("a stat case read at a reading holding class masteries takes that hash and keeps every pin", () => {
  const said = backfillReadingMasteries(
    worldOf({ [READINGS_AT]: `${HOLDING}\n${BEFORE_PASSIVES}\n`, [CASE_AT]: CASE })
  )
  const line = JSON.parse(contentAt(said, READINGS_AT).split("\n")[0] ?? "{}")
  const stated = JSON.parse(contentAt(said, CASE_AT))
  expect(stated.buildHash).toBe(line.buildHash)
  expect({ ...stated, buildHash: "" }).toEqual({ ...JSON.parse(CASE), buildHash: "" })
  expect(said.told).toEqual([
    "1 readings' build hashes rewritten at minor fourteen with their class masteries",
    "0 already holding their class masteries, 0 whose hash does not decode and 0 that would not read back, left as they are",
    "1 stat cases rewritten with their reading's class masteries: stalker-front-bar",
    "stalker: 1 rewritten: 01a1aaaa",
  ])
})

test("a reading and a case already holding their class masteries are left as they are", () => {
  const first = backfillReadingMasteries(
    worldOf({ [READINGS_AT]: `${HOLDING}\n`, [CASE_AT]: CASE })
  )
  const again = backfillReadingMasteries(
    worldOf({ [READINGS_AT]: contentAt(first, READINGS_AT), [CASE_AT]: contentAt(first, CASE_AT) })
  )
  expect(again.edits).toEqual([])
})
