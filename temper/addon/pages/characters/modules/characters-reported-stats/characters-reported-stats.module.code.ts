import {
  advancedSheet,
  advancedSheetSaid,
} from "akasha/temper/addon/pages/characters/modules/characters-advanced-sheet/characters-advanced-sheet.module.code.ts"
import { archiveBoons } from "akasha/temper/addon/pages/characters/modules/characters-archive-boons/characters-archive-boons.module.code.ts"
import { characterSheet } from "akasha/temper/addon/pages/characters/modules/characters-character-sheet/characters-character-sheet.module.code.ts"
import { classMasteryOnce } from "akasha/temper/addon/pages/characters/modules/characters-class-mastery/characters-class-mastery.module.code.ts"
import { currentCharacterEntry } from "akasha/temper/addon/pages/characters/modules/characters-current-entry/characters-current-entry.module.code.ts"
import {
  elderDragonAmount,
  healthBefore,
} from "akasha/temper/addon/pages/characters/modules/characters-elder-dragon-pairing/characters-elder-dragon-pairing.module.code.ts"
import { feteOf } from "akasha/temper/addon/pages/characters/modules/characters-escalating-fete/characters-escalating-fete.module.code.ts"
import { passiveRankIdsOnce } from "akasha/temper/addon/pages/characters/modules/characters-passive-rank-ids/characters-passive-rank-ids.module.code.ts"
import {
  type Bar,
  settled,
} from "akasha/temper/addon/pages/characters/modules/characters-reported-stats-settle/characters-reported-stats-settle.module.code.ts"
import { captureCharacterBuildHash } from "akasha/temper/capture/characters-capture-addon/modules/character-capture-build/character-capture-build.module.code.ts"
import { buildHash as asBuildHash } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-04/eso-enums-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-05/eso-enums-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-13/eso-enums-13.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-04/eso-functions-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-06/eso-functions-06.type-declaration.d.ts"
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

const ADVANCED_STATS: ReadonlyArray<readonly [string, number]> = [
  ["critical-damage", ADVANCED_STAT_DISPLAY_TYPE_CRITICAL_DAMAGE],
  ["healing-critical-bonus", ADVANCED_STAT_DISPLAY_TYPE_CRITICAL_HEALING],
  ["healing-done-base", ADVANCED_STAT_DISPLAY_TYPE_HEALING_DONE_BONUSES],
  ["healing-taken-base", ADVANCED_STAT_DISPLAY_TYPE_HEALING_TAKEN_BONUSES],
]

const PERCENT = 100

function advancedStats(): Record<string, number> {
  const advanced: Record<string, number> = {}
  for (const [name, statType] of ADVANCED_STATS) {
    const [, , percent] = GetAdvancedStatValue(statType)
    advanced[name] = (percent ?? 0) / PERCENT
  }
  return advanced
}

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

type Pet = {
  name: string
  dead: boolean
}

function pets(): Pet[] {
  const held: Pet[] = []
  for (let index = 1; index <= MAX_PET_UNIT_TAGS; index++) {
    const unitTag = `playerpet${index}`
    if (!DoesUnitExist(unitTag)) continue
    held.push({ name: zo_strformat("<<1>>", GetUnitName(unitTag)), dead: IsUnitDead(unitTag) })
  }
  return held
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

type SetBonus = {
  required: number
  description: string
  perfected: boolean
}

type WornSet = {
  setId: number
  setName?: string
  setBonusCount?: number
  setEquipped?: number
  setMaxEquipped?: number
  setPerfectedEquipped?: number
  setBonuses?: SetBonus[]
}

type WornPiece = WornSet & {
  slot: number
  link: string
  requiredLevel: number
  requiredChampionPoints: number
  armor: number
  weaponPower: number
  enchant: string
  enchantCategory: number
  trait: string
  quality: number
}

function enchantCategoryOf(link: string): number {
  const enchantId = GetItemLinkFinalEnchantId(link)
  return enchantId === 0 ? 0 : GetEnchantSearchCategoryType(enchantId)
}

function setBonusesOf(link: string, count: number): SetBonus[] {
  const bonuses: SetBonus[] = []
  for (let index = 1; index <= count; index++) {
    const [required, description, perfected] = GetItemLinkSetBonusInfo(link, true, index)
    bonuses.push({ required, description, perfected: perfected === true })
  }
  return bonuses
}

function wornSetOf(link: string): WornSet {
  const [hasSet, setName, setBonusCount, setEquipped, setMaxEquipped, setId, perfected] =
    GetItemLinkSetInfo(link, true)
  if (!hasSet) return { setId: 0 }
  return {
    setId,
    setName,
    setBonusCount,
    setEquipped,
    setMaxEquipped,
    setPerfectedEquipped: perfected,
    setBonuses: setBonusesOf(link, setBonusCount),
  }
}

function worn(): WornPiece[] {
  const pieces: WornPiece[] = []
  const size = GetBagSize(BAG_WORN)
  for (let slot = 0; slot < size; slot++) {
    const link = GetItemLink(BAG_WORN, slot)
    if (link === "") continue
    const [, , enchant] = GetItemLinkEnchantInfo(link)
    const [, trait] = GetItemLinkTraitInfo(link)
    pieces.push({
      slot,
      link,
      requiredLevel: GetItemLinkRequiredLevel(link),
      requiredChampionPoints: GetItemLinkRequiredChampionPoints(link),
      armor: GetItemLinkArmorRating(link, false),
      weaponPower: GetItemLinkWeaponPower(link),
      enchant,
      enchantCategory: enchantCategoryOf(link),
      trait,
      quality: GetItemLinkFunctionalQuality(link),
      ...wornSetOf(link),
    })
  }
  return pieces
}

const FIRST_SKILL_SLOT = 3

const ULTIMATE_SLOT = 8

type SlottedSkill = {
  slot: number
  abilityId: number
  name: string
  description: string
  durationMs: number
  castMs: number
  channeled: boolean
  cooldownMs: number
  ultimateCost: number
}

type ClassPassive = {
  abilityId: number
  name: string
  description: string
}

function classPassives(): ClassPassive[] {
  const passives: ClassPassive[] = []
  const lines = GetNumSkillLines(SKILL_TYPE_CLASS)
  for (let lineIndex = 1; lineIndex <= lines; lineIndex++) {
    const abilities = GetNumSkillAbilities(SKILL_TYPE_CLASS, lineIndex)
    for (let skillIndex = 1; skillIndex <= abilities; skillIndex++) {
      if (!IsSkillAbilityPassive(SKILL_TYPE_CLASS, lineIndex, skillIndex)) continue
      if (!IsSkillAbilityPurchased(SKILL_TYPE_CLASS, lineIndex, skillIndex)) continue
      const abilityId = GetSkillAbilityId(SKILL_TYPE_CLASS, lineIndex, skillIndex, false)
      passives.push({
        abilityId,
        name: zo_strformat("<<1>>", GetAbilityName(abilityId, "player")),
        description: GetAbilityDescription(abilityId, undefined, "player"),
      })
    }
  }
  return passives
}

function slottedAbilityId(slot: number): number {
  const bound = GetSlotBoundId(slot)
  if (GetSlotType(slot) === ACTION_TYPE_CRAFTED_ABILITY)
    return GetAbilityIdForCraftedAbilityId(bound)
  return bound
}

function slottedSkills(): SlottedSkill[] {
  const skills: SlottedSkill[] = []
  for (let slot = FIRST_SKILL_SLOT; slot <= ULTIMATE_SLOT; slot++) {
    const abilityId = slottedAbilityId(slot)
    if (abilityId === 0) continue
    const [channeled, castMs] = GetAbilityCastInfo(abilityId, undefined, "player")
    skills.push({
      slot,
      abilityId,
      name: zo_strformat("<<1>>", GetAbilityName(abilityId, "player")),
      description: GetAbilityDescription(abilityId, undefined, "player"),
      durationMs: GetAbilityDuration(abilityId, undefined, "player") ?? 0,
      castMs: castMs ?? 0,
      channeled: channeled === true,
      cooldownMs: GetAbilityCooldown(abilityId, "player") ?? 0,
      ultimateCost:
        slot === ULTIMATE_SLOT
          ? GetAbilityCost(abilityId, COMBAT_MECHANIC_FLAGS_ULTIMATE, undefined, "player")
          : 0,
    })
  }
  return skills
}

function statsSaid(stats: Record<string, number>, unbonused: Record<string, number>): string {
  const said: string[] = []
  for (const [name] of REPORTED_STATS) said.push(`${stats[name] ?? ""}/${unbonused[name] ?? ""}`)
  return said.join(",")
}

function buffsSaid(): string {
  const said: string[] = []
  for (const buff of activeBuffs()) said.push(`${buff.abilityId}:${buff.name}x${buff.stacks}`)
  said.sort()
  return said.join(",")
}

function retake(this: void): undefined {
  captureBar(true)
}

function heldBar(): Bar | undefined {
  const [pair] = GetActiveWeaponPairInfo()
  if (pair === ACTIVE_WEAPON_PAIR_MAIN) return "frontBar"
  if (pair === ACTIVE_WEAPON_PAIR_BACKUP) return "backBar"
  return undefined
}

type StatsNow = readonly [stats: Record<string, number>, unbonusedStats: Record<string, number>]

function statsNow(): StatsNow {
  const stats: Record<string, number> = {}
  const unbonusedStats: Record<string, number> = {}
  for (const [name, stat] of REPORTED_STATS) {
    stats[name] = GetPlayerStat(stat, STAT_BONUS_OPTION_APPLY_BONUS)
    unbonusedStats[name] = GetPlayerStat(stat, STAT_BONUS_OPTION_DONT_APPLY_BONUS)
  }
  return [stats, unbonusedStats]
}

function powerHeld(power: number): number {
  const [current] = GetUnitPower("player", power)
  return current
}

function readingOf(buildHash: string, [stats, unbonusedStats]: StatsNow) {
  const buffs = activeBuffs()
  return {
    capturedAt: GetTimeStamp(),
    buildHash: asBuildHash(buildHash),
    esoVersion: GetESOVersionString(),
    inCombat: IsUnitInCombat("player"),
    blocking: IsBlockActive(),
    moving: IsPlayerMoving(),
    ultimate: powerHeld(COMBAT_MECHANIC_FLAGS_ULTIMATE),
    health: powerHeld(COMBAT_MECHANIC_FLAGS_HEALTH),
    stats,
    unbonusedStats,
    activeBuffs: buffs,
    fete: feteOf(buffs),
    pets: pets(),
    inArchive: IsInstanceEndlessDungeon(),
    archiveBoons: archiveBoons(),
    championPoints: championPoints(),
    worn: worn(),
    skills: slottedSkills(),
    classPassives: classPassives(),
    advanced: advancedStats(),
    advancedSheet: advancedSheet(),
    sheet: characterSheet(stats),
  }
}

function keptReading(buildHash: string, now: StatsNow, healthPaired = false) {
  return {
    ...readingOf(buildHash, now),
    passiveRankIds: passiveRankIdsOnce(),
    classMastery: classMasteryOnce(),
    healthBefore: healthBefore(),
    healthPaired,
    elderDragonAmount: elderDragonAmount(),
  }
}

export type KeptReading = ReturnType<typeof keptReading>

export function heldBarReading(): { bar: Bar; reading: ReturnType<typeof readingOf> } | undefined {
  const bar = heldBar()
  if (bar === undefined) return undefined
  return { bar, reading: readingOf(captureCharacterBuildHash().buildHash, statsNow()) }
}

let readingKept: (() => undefined) | undefined

export function whenReadingKept(listener: () => undefined): undefined {
  readingKept = listener
}

export function captureReportedStats(): undefined {
  return captureBar(false)
}

function keep(bar: Bar, reading: KeptReading): undefined {
  const charEntry = currentCharacterEntry()
  if (charEntry === undefined) return
  const reported = charEntry.reportedStats ?? {}
  reported[bar] = reading
  charEntry.reportedStats = reported
  readingKept?.()
}

export function keepPairedReading(): undefined {
  const bar = heldBar()
  if (bar === undefined) return
  const buildHash = captureCharacterBuildHash().buildHash
  keep(bar, keptReading(buildHash, statsNow(), true))
}

function captureBar(followUp: boolean): undefined {
  if (currentCharacterEntry() === undefined) return
  const bar = heldBar()
  if (bar === undefined) return
  const now = statsNow()
  const buildHash = captureCharacterBuildHash().buildHash
  const said = `${statsSaid(now[0], now[1])}|${buffsSaid()}|${advancedSheetSaid()}`
  if (!settled(bar, buildHash, said, followUp, retake)) return
  keep(bar, keptReading(buildHash, now))
}
