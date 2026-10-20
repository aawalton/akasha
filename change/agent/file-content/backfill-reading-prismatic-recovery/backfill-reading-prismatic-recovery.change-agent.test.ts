import { expect, test } from "bun:test"
import { backfillReadingPrismaticRecovery } from "akasha/change/agent/file-content/backfill-reading-prismatic-recovery/backfill-reading-prismatic-recovery.change-agent.code.ts"
import { NOTHING_OVER, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { decodeBuild } from "akasha/temper/player/character/build/build-codec/modules/build-codec/build-codec.module.code.ts"
import { holdSetCatalogFromCheckout } from "akasha/temper/player/character/characters-equipment/modules/sets-all/sets-all.module.test-fixtures.ts"
import { buildHash } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { holdSkillCatalogFromCheckout } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.test-fixtures.ts"
import { resultOf } from "akasha/temper/player/character/stat/modules/build-reading-lines/build-reading-lines.module.code.ts"

holdSetCatalogFromCheckout()
holdSkillCatalogFromCheckout()

const READINGS_AT =
  "temper/player/character/temper-account-character/pages/khelta/khelta.temper-account-character.readings.jsonl"

const NECKLACE_UNHASHED =
  "ATQKVMUAAIBkRRMCU_lAANp_LckLmC25IXMFtyQuYLbkhcwW3JC5gtuQgUdrchBAq2cCCBVs4JhEx2gCIgmOtuUSgsGXp9K_KyM7yU0xcXdEEAidEAIGQFAQBQAkANcFwbBdASXYCaoUTJA6AAIMB0CEdwAYcIUISIzMDEjA1IAIyMhIAIhEgMgIAETIwOjIwOiJkEzAIIiI6MwESMjrLo16jUixJwyseTLLmTZ2fRp1a9s-hRpU6niqsbR2Rs8fXL0DFkhaImyN07SJUyd-oUwVUJXHWGDhskbAlSwIwDCBQxk0HECTZwULGDRw8gRJHScBQDIOMSBr"

const NECKLACE_HASHED =
  "ATQKVMUAAIBkRRMCU_lAANp_LckLmC25IXMFtyQuYLbkhcwW3JC5gtuQjUdrchBAq2cCCBVs4JhEx2gCIgmOtuUSgsGXp9K_KyM7yU0xcXdEEAidEAIGQFAQBQAkANcFwbBdASXYCaoUTJA6AAIMB0CEdwAYcIUISIzMDEjA1IAIyMhIAIhEgMgIAETIwOjIwOiJkEzAIIiI6MwESMjrLo16jUixJwyseTLLmTZ2fRp1a9s-hRpU6niqsbR2Rs8fXL0DFkhaImyN07SJUyd-oUwVUJXHWGDhskbAlSwIwDCBQxk0HECTZwULGDRw8gRJHScBQDIOMSBr"

const PRISMATIC_NECKLACE = {
  slot: 1,
  link: "|H0:item:194512:364:50:166047:370:50:31:25:0:0:0:0:0:0:2049:0:0:1:0:0:0|h|h",
  enchant:
    "Adds |cffffff84|r Magicka Recovery.\nAdds |cffffff84|r Health Recovery.\nAdds |cffffff84|r Stamina Recovery.",
}

function lineOf(id: string, hash: string): string {
  const one = {
    character: "Khelta the Eternal",
    buildHash: hash,
    bar: "frontBar",
    reading: {
      capturedAt: 1,
      stats: { "magicka-recovery": 598 },
      worn: { "1": PRISMATIC_NECKLACE },
    },
  }
  return JSON.stringify({ id, result: resultOf(one), ...one })
}

const UNHASHED = lineOf("01a1aaaa", NECKLACE_UNHASHED)

const HASHED = lineOf("01a1bbbb", NECKLACE_HASHED)

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

function writtenOf(said: ReturnType<typeof backfillReadingPrismaticRecovery>): readonly string[] {
  const one = said.edits[0]
  if (one?.kind !== "replace") return []
  return one.contentTo.split("\n").filter((line) => line !== "")
}

test("a worn Prismatic Recovery glyph the hash reads as no enchant is written into the hash", () => {
  const line = JSON.parse(
    writtenOf(backfillReadingPrismaticRecovery(worldOf(`${UNHASHED}\n`)))[0] ?? "{}"
  )
  const necklace = decodeBuild(buildHash(line.buildHash))?.equipment.jewelry.necklace
  expect(necklace?.itemType === "jewelry" ? necklace.data.enchantment : null).toBe(
    "prismatic-recovery"
  )
  expect(line.result).toBe(resultOf(line))
})

test("everything but the hash and the result is left as the reading held it", () => {
  const before = JSON.parse(UNHASHED)
  const after = JSON.parse(
    writtenOf(backfillReadingPrismaticRecovery(worldOf(`${UNHASHED}\n`)))[0] ?? "{}"
  )
  expect({ ...after, buildHash: "", result: "" }).toEqual({ ...before, buildHash: "", result: "" })
})

test("a reading whose hash already holds the glyph is left as it is", () => {
  expect(backfillReadingPrismaticRecovery(worldOf(`${HASHED}\n`)).edits).toEqual([])
})

test("the change says what it rewrote", () => {
  const said = backfillReadingPrismaticRecovery(worldOf(`${UNHASHED}\n${HASHED}\n`))
  expect(said.told).toEqual([
    "1 readings' build hashes rewritten with Prismatic Recovery in 1 readings files",
    "0 whose hash does not decode and 0 that would not read back as worn, left as they are",
    "khelta: 1 rewritten: 01a1aaaa",
  ])
})
