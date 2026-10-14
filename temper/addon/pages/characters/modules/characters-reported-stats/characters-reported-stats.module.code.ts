import { currentCharacterEntry } from "akasha/temper/addon/pages/characters/modules/characters-current-entry/characters-current-entry.module.code.ts"
import "akasha/temper/eso/type/eso-enums-06/eso-enums-06.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"

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

function activeBuffs(): { abilityId: number; name: string }[] {
  const buffs: { abilityId: number; name: string }[] = []
  const count = GetNumBuffs("player")
  for (let index = 1; index <= count; index++) {
    const [name, , , , , , , , , , abilityId] = GetUnitBuffInfo("player", index)
    buffs.push({ abilityId, name: zo_strformat("<<1>>", name) })
  }
  return buffs
}

const CHAMPION_DISCIPLINES = 3

function championPoints(): { championSkillId: number; points: number; maxPoints: number }[] {
  const stars: { championSkillId: number; points: number; maxPoints: number }[] = []
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
        })
      }
    }
  }
  return stars
}

export function captureReportedStats(): undefined {
  const charEntry = currentCharacterEntry()
  if (charEntry === undefined) return
  const [pair] = GetActiveWeaponPairInfo()
  if (pair !== ACTIVE_WEAPON_PAIR_MAIN && pair !== ACTIVE_WEAPON_PAIR_BACKUP) return

  const stats: Record<string, number> = {}
  for (const [name, stat] of REPORTED_STATS) {
    stats[name] = GetPlayerStat(stat, STAT_BONUS_OPTION_APPLY_BONUS)
  }
  const reading = {
    capturedAt: GetTimeStamp(),
    inCombat: IsUnitInCombat("player"),
    stats,
    activeBuffs: activeBuffs(),
    championPoints: championPoints(),
  }

  const reported = charEntry.reportedStats ?? {}
  if (pair === ACTIVE_WEAPON_PAIR_MAIN) reported.frontBar = reading
  else reported.backBar = reading
  charEntry.reportedStats = reported
}
