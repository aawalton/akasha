import { expect, test } from "bun:test"
import { backfillReadingLevels } from "akasha/change/agent/file-content/backfill-reading-levels/backfill-reading-levels.change-agent.code.ts"
import { NOTHING_OVER, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { decodeBuild } from "akasha/temper/player/character/build/build-codec/modules/build-codec/build-codec.module.code.ts"
import { base64urlToBytes } from "akasha/temper/player/character/build/build-hash/modules/build-hash-base64url/build-hash-base64url.module.code.ts"
import { holdSetCatalogFromCheckout } from "akasha/temper/player/character/characters-equipment/modules/sets-all/sets-all.module.test-fixtures.ts"
import { buildHash } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { holdSkillCatalogFromCheckout } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.test-fixtures.ts"
import { resultOf } from "akasha/temper/player/character/stat/modules/build-reading-lines/build-reading-lines.module.code.ts"

holdSetCatalogFromCheckout()
holdSkillCatalogFromCheckout()

const READINGS_AT =
  "temper/player/character/temper-account-character/pages/erin/erin.temper-account-character.readings.jsonl"

const SASHED_AT_MINOR_TEN =
  "ATQKNIDAAIBhxAkDE_tnAGJ_bOAMmC2cIZMFs4IAADQABkwWzgDJgtnAg0drchBAq25CCBVtyJHkx23KIgmOtuUSiujklLE8ruM5x0uJJMhGiAiddgqG_3gAJxQk4xcng-Bd__Hbga6GTSK6IFI991UEf14MeIlQiIyICAyMyAiIiIyIgMgIjUiIiAjIjNCIAIjQgMjIzMyNAIARDIiMDojI0A6AiJkMzIjQgAAAjgiICJKMyA0IiIjAjosujXqMyLEmVjyZZcybOz6NOrXtn0KNKnU8VVjeOyOHj65egYskLRE2bo3TtIlTJ36hTBVQlcdYYJHDZsCVLAjAMIFDGTQcQJNnBQsYNHDyBEkdJvgFMmWAgk14ZLOeJjBIDGFAhHmwXWK1ymYYi54JJQiAHt5m1r2nmuHsoGQ"

const LEVEL_ONE_SASH = "|H0:item:43548:30:1:0:0:0:0:0:0:0:0:0:0:0:0:1:1:0:0:10000:0|h|h"

const CP160_CHEST = "|H0:item:215582:370:50:68343:312:50:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h"

function lineOf(id: string, capturedAt: number, worn: Record<string, unknown>) {
  const one = {
    character: "Erin Solstice",
    buildHash: SASHED_AT_MINOR_TEN,
    bar: "backBar",
    reading: { capturedAt, stats: { "resistance-physical": 31628 }, worn },
  }
  return JSON.stringify({ id, result: resultOf(one), ...one })
}

const SASHED = lineOf("01a1aaaa", 1, {
  "1": { slot: 2, link: CP160_CHEST, armor: 2772 },
  "2": { slot: 6, link: LEVEL_ONE_SASH, armor: 19 },
})

const CP160_ONLY = lineOf("01a1bbbb", 2, { "1": { slot: 2, link: CP160_CHEST, armor: 2772 } })

function worldOf(readings: string): World {
  const texts: Record<string, string> = { [READINGS_AT]: readings }
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

function writtenOf(said: ReturnType<typeof backfillReadingLevels>): readonly string[] {
  const one = said.edits[0]
  if (one?.kind !== "replace") return []
  return one.contentTo.split("\n").filter((line) => line !== "")
}

test("a reading wearing a piece below CP160 takes a minor-thirteen hash holding that level", () => {
  const line = JSON.parse(writtenOf(backfillReadingLevels(worldOf(`${SASHED}\n`)))[0] ?? "{}")
  expect(base64urlToBytes(line.buildHash)?.[2]).toBe(13)
  expect(decodeBuild(buildHash(line.buildHash))?.equipment.armor.waist.data?.level).toBe(1)
  expect(line.result).toBe(resultOf(line))
})

test("everything but the hash and the result is left as the reading held it", () => {
  const before = JSON.parse(SASHED)
  const after = JSON.parse(writtenOf(backfillReadingLevels(worldOf(`${SASHED}\n`)))[0] ?? "{}")
  expect({ ...after, buildHash: "", result: "" }).toEqual({ ...before, buildHash: "", result: "" })
})

test("a reading wearing only CP160 pieces is left as it is", () => {
  const said = backfillReadingLevels(worldOf(`${CP160_ONLY}\n`))
  expect(said.edits).toEqual([])
})

test("the change says what it rewrote", () => {
  const said = backfillReadingLevels(worldOf(`${SASHED}\n${CP160_ONLY}\n`))
  expect(said.told).toEqual([
    "1 readings' build hashes rewritten at minor thirteen in 1 readings files",
    "0 already at minor thirteen, 1 wearing only CP160 pieces and glyphs, left as they are",
    "0 whose hash does not decode and 0 that would not read back as worn, left as they are",
    "erin: 1 rewritten: 01a1aaaa",
  ])
})
