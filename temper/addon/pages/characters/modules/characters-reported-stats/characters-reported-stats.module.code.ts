import { currentCharacterEntry } from "akasha/temper/addon/pages/characters/modules/characters-current-entry/characters-current-entry.module.code.ts"
import "akasha/temper/eso/type/eso-enums-06/eso-enums-06.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-10/eso-functions-10.type-declaration.d.ts"

const REPORTED_STATS: ReadonlyArray<readonly [string, number]> = [
  ["health-maximum", STAT_HEALTH_MAX],
  ["magicka-maximum", STAT_MAGICKA_MAX],
  ["stamina-maximum", STAT_STAMINA_MAX],
  ["health-recovery", STAT_HEALTH_REGEN_COMBAT],
  ["magicka-recovery", STAT_MAGICKA_REGEN_COMBAT],
  ["stamina-recovery", STAT_STAMINA_REGEN_COMBAT],
  ["resistance-physical", STAT_PHYSICAL_RESIST],
  ["resistance-spell", STAT_SPELL_RESIST],
  ["resistance-critical", STAT_CRITICAL_RESISTANCE],
  ["penetration-physical", STAT_PHYSICAL_PENETRATION],
  ["penetration-spell", STAT_SPELL_PENETRATION],
  ["power-weapon", STAT_POWER],
  ["power-spell", STAT_SPELL_POWER],
  ["critical-rating-weapon", STAT_CRITICAL_STRIKE],
  ["critical-rating-spell", STAT_SPELL_CRITICAL],
]

type ActiveBuff = {
  abilityId: number
  name: string
  description: string
  effect: string
  stacks: number
}

function activeBuffs(): ActiveBuff[] {
  const buffs: ActiveBuff[] = []
  const count = GetNumBuffs("player")
  for (let index = 1; index <= count; index++) {
    const [name, , , buffSlot, stacks, , , , , , abilityId] = GetUnitBuffInfo("player", index)
    buffs.push({
      abilityId,
      name: zo_strformat("<<1>>", name),
      description: GetAbilityDescription(abilityId, undefined, "player"),
      effect: GetAbilityEffectDescription(buffSlot),
      stacks,
    })
  }
  return buffs
}

const CHAMPION_DISCIPLINES = 3

type StarSpent = {
  championSkillId: number
  points: number
  maxPoints: number
  bonus: string
  slottable: boolean
}

function championPoints(): StarSpent[] {
  const stars: StarSpent[] = []
  for (let disciplineIndex = 1; disciplineIndex <= CHAMPION_DISCIPLINES; disciplineIndex++) {
    const count = GetNumChampionDisciplineSkills(disciplineIndex)
    for (let skillIndex = 1; skillIndex <= count; skillIndex++) {
      const championSkillId = GetChampionSkillId(disciplineIndex, skillIndex)
      const points = GetNumPointsSpentOnChampionSkill(championSkillId)
      if (points > 0) {
        stars.push({
          championSkillId,
          points,
          maxPoints: GetChampionSkillMaxPoints(championSkillId),
          bonus: GetChampionSkillCurrentBonusText(championSkillId, points),
          slottable: CanChampionSkillTypeBeSlotted(GetChampionSkillType(championSkillId)),
        })
      }
    }
  }
  return stars
}

type WornPiece = { slot: number; link: string; armor: number; enchant: string }

function worn(): WornPiece[] {
  const pieces: WornPiece[] = []
  const size = GetBagSize(BAG_WORN)
  for (let slot = 0; slot < size; slot++) {
    const link = GetItemLink(BAG_WORN, slot)
    if (link === "") continue
    const [, , enchant] = GetItemLinkEnchantInfo(link)
    pieces.push({ slot, link, armor: GetItemLinkArmorRating(link, false), enchant })
  }
  return pieces
}

export function captureReportedStats(): undefined {
  const charEntry = currentCharacterEntry()
  if (charEntry === undefined) return
  const [pair] = GetActiveWeaponPairInfo()
  if (pair !== ACTIVE_WEAPON_PAIR_MAIN && pair !== ACTIVE_WEAPON_PAIR_BACKUP) return

  const stats: Record<string, number> = {}
  const unbonusedStats: Record<string, number> = {}
  for (const [name, stat] of REPORTED_STATS) {
    stats[name] = GetPlayerStat(stat, STAT_BONUS_OPTION_APPLY_BONUS)
    unbonusedStats[name] = GetPlayerStat(stat, STAT_BONUS_OPTION_DONT_APPLY_BONUS)
  }
  const reading = {
    capturedAt: GetTimeStamp(),
    inCombat: IsUnitInCombat("player"),
    stats,
    unbonusedStats,
    activeBuffs: activeBuffs(),
    championPoints: championPoints(),
    worn: worn(),
  }

  const reported = charEntry.reportedStats ?? {}
  if (pair === ACTIVE_WEAPON_PAIR_MAIN) reported.frontBar = reading
  else reported.backBar = reading
  charEntry.reportedStats = reported
}
