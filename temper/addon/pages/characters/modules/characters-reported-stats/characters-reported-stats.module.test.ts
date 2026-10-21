import { expect, test } from "bun:test"
import type { KeptReading } from "akasha/temper/addon/pages/characters/modules/characters-reported-stats/characters-reported-stats.module.code.ts"
import type { reportedStatsReadingSchema } from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"
import { assertSchemaKeysMatchPayload } from "akasha/temper/test-fixtures/assert-schema-keys-match-payload/assert-schema-keys-match-payload.test-fixture.code.ts"

test("a kept reading names every key the reading schema admits, and no other", () => {
  expect(
    assertSchemaKeysMatchPayload<typeof reportedStatsReadingSchema, KeptReading>(true)
  ).toBeUndefined()
})

const SKILL_TYPES = [
  "SKILL_TYPE_CLASS",
  "SKILL_TYPE_WEAPON",
  "SKILL_TYPE_ARMOR",
  "SKILL_TYPE_WORLD",
  "SKILL_TYPE_GUILD",
  "SKILL_TYPE_AVA",
  "SKILL_TYPE_RACIAL",
  "SKILL_TYPE_TRADESKILL",
]

const MASTERY_ABILITY_ID = 250001

const PASSIVE_RANK_IDS = [40001, 40002, 40003]

const RANK_ARGUMENT = 4

function fakeTheGame(): undefined {
  const game: Record<string, unknown> = {
    GetNumSkillLines: () => 1,
    GetNumSkillAbilities: () => 1,
    IsSkillAbilityPassive: () => true,
    GetSpecificSkillAbilityInfo: (...args: number[]) => [
      PASSIVE_RANK_IDS[(args[RANK_ARGUMENT] ?? 0) - 1] ?? 0,
    ],
    GetSkillLineDynamicInfo: () => [0, 0, 0, 0, 0, 0, true],
    GetSkillLineInfo: () => ["Slayer", 0, 0, 1],
    GetSkillLineClassId: () => 1,
    GetSkillAbilityId: () => MASTERY_ABILITY_ID,
    zo_strformat: (_format: string, text: string) => text,
    GetAbilityName: () => "Slayer passive",
    GetAbilityDescription: () => "text",
    IsSkillAbilityPurchased: () => true,
  }
  SKILL_TYPES.forEach((name, index) => {
    game[name] = index + 1
  })
  Object.assign(globalThis, game)
}

const CAPTURES_IN_ONE_SESSION = 6

test("every capture of a session carries the class mastery lines and the passive rank ids", async () => {
  fakeTheGame()
  const { classMasteryLines } = await import(
    "akasha/temper/addon/pages/characters/modules/characters-class-mastery/characters-class-mastery.module.code.ts"
  )
  const { passiveRankIds } = await import(
    "akasha/temper/addon/pages/characters/modules/characters-passive-rank-ids/characters-passive-rank-ids.module.code.ts"
  )
  for (let capture = 1; capture <= CAPTURES_IN_ONE_SESSION; capture++) {
    expect(classMasteryLines()[0]?.passives[0]?.abilityId).toBe(MASTERY_ABILITY_ID)
    expect(passiveRankIds()[0]).toEqual(PASSIVE_RANK_IDS)
  }
})
