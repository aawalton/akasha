import type { CategoryKey } from "@akasha/temper-combat-addon/combat-categories"
import type {
  Fight,
  FightRecapData,
  GroupRecapData,
  UnitEntry,
} from "@akasha/temper-combat-addon/combat-lib-types"

export type CoreLogLine = (number | string | undefined)[]

export type DamageCategory = "damageOut" | "damageIn" | "healingOut" | "healingIn"

export function isDamageCategory(this: void, value: string): value is DamageCategory {
  return (
    value === "damageOut" || value === "damageIn" || value === "healingOut" || value === "healingIn"
  )
}

export type CategorySums = Partial<Record<CategoryKey, number>>

export type BaseAbilityValues = CategorySums & {
  max: number
  min: number
}

export interface AbilityData extends BaseAbilityValues {
  name: string
  pet: boolean
  damageType: number | string
  isheal: boolean
  [key: string]: unknown
}

export interface EffectStackData {
  uptime: number
  count: number
  groupUptime: number
  groupCount: number
}

export interface EffectInstance {
  [stacks: number]: EffectStackData | undefined
  uptime?: number
  count?: number
  groupUptime?: number
  groupCount?: number
}

export interface EffectSlotData {
  isPlayerSource?: boolean
  abilityId?: number
  [stacks: number]: number | undefined
}

export interface EffectData {
  name: string
  iconId: number
  uptime: number
  count: number
  groupUptime: number
  groupCount: number
  effectType: number
  maxStacks: number
  firstStartTime: number | undefined
  firstGroupStartTime: number | undefined
  slots: Record<number, EffectSlotData> | undefined
  instances: Record<number, EffectInstance>
  icon?: string
}

export interface ResourceAbilityData {
  ticks: number
  value: number
  rate?: number
}

export interface ResourceData {
  gains?: Record<number, ResourceAbilityData>
  drains?: Record<number, ResourceAbilityData>
  totalgains: number
  totaldrains: number
  gainRate?: number
  drainRate?: number
}

export type ResourceTable = Record<number, ResourceData>

export interface SkillCastData {
  started: number[] | undefined
  times: number[]
  delaySum: number
  delayCount: number
  weavingTimeSum: number
  weavingTimeCount: number
  failedCount: number
  weavingErrors: number
  ignored?: boolean
  count?: number
  delayAvg?: number
  weavingTimeAvg?: number
  diffTimeAvg?: number
}

export type CastEntry = [
  reducedslot: number,
  registered: number,
  queued?: number,
  startTime?: number,
  endTime?: number,
]

export interface BarStats {
  onTimes: number[] | undefined
  offTimes: number[] | undefined
  damageOut: number
  damageIn: number
  healingOut: number
  healingIn: number
  totalTime?: number
}

export interface StatData {
  min: number
  max: number
  dmgsum: number
  healsum: number
  dmgavg?: number
  healavg?: number
}

export interface UnitStatData {
  value: number
  debuffs: Record<string, number>
}

export interface PerformanceData {
  count: number
  minMin?: number
  maxMin?: number
  sumMin?: number
  minMax?: number
  maxMax?: number
  sumMax?: number
  minAvg?: number
  maxAvg?: number
  sumAvg?: number
  minPing?: number
  maxPing?: number
  sumPing?: number
  avgMin?: number
  avgMax?: number
  avgAvg?: number
  avgPing?: number
}

export type BasicValues = CategorySums & {
  damageOut: Record<number, AbilityData>
  damageIn: Record<number, AbilityData>
  healingOut: Record<number, AbilityData>
  healingIn: Record<number, AbilityData>
  spellResistance: Record<number, number>
  physicalResistance: Record<number, number>
  spellCrit: Record<number, number>
  weaponCrit: Record<number, number>
}

export interface UnitCalc extends BasicValues {
  unitId?: number
  starttime?: number
  endtime?: number
  buffs: Record<string, EffectData>
  statData: Record<number, UnitStatData>
  [key: string]: unknown
}

export interface CalculatedData extends BasicValues {
  temp: { stats: Record<number, number> } | undefined
  units: Record<number, UnitCalc>
  stats: Record<number, StatData>
  resources: ResourceTable
  skills: Record<number, SkillCastData>
  casts: CastEntry[] | undefined
  lastIndex: Record<number, number | undefined> | undefined
  barStats: Record<number, BarStats>
  totalWeavingTimeSum: number
  totalWeavingTimeCount: number
  totalWeaponAttacks: number
  totalSkillsFired: number
  delayAvg?: number
  performance: PerformanceData
  buildInfo: {
    mundus: Record<number, number>
    drinkFood: Record<number, number>
    potions: Record<string, number>
  }
  graph: Record<DamageCategory, Record<number, number>>
  buffVersion: number
  calcVersion: number
  groupDamageOut?: number
  groupDamageIn?: number
  groupDPSOut?: number
  groupHPSOut?: number
  groupHPSIn?: number
  groupDPSIn?: number
  groupHealOut?: number
  groupHealIn?: number
  buffs?: Record<string, EffectData>
  damageOutSpells?: BaseAbilityValues
  damageOutWeapon?: BaseAbilityValues
  damageInSpells?: number
  damageInWeapon?: number
  [key: string]: unknown
}

export interface CmxFight extends Fight {
  starttime: number
  endtime: number
  log: CoreLogLine[]
  calculated?: CalculatedData
  cindex?: number
  calculating?: boolean
  fightlabel?: string
}

export interface CurrentData extends Partial<FightRecapData>, Partial<GroupRecapData> {
  log: CoreLogLine[]
  DPSOut: number
  DPSIn: number
  HPSOut: number
  HPSAOut: number
  HPSIn: number
  dpstime: number
  hpstime: number
  groupDPSOut: number
  groupDPSIn: number
  groupHPSOut: number
  groupHPS: number
  units?: Record<number, UnitEntry>
}

export interface SelectionState {
  ability: Record<string, Record<number, unknown> | undefined>
  unit: Record<string, Record<number, unknown> | undefined>
}

export interface SelectedBuff {
  uptime: number
  count: number
  groupUptime: number
  groupCount: number
  maxStacks: number
  effectType: number
  iconId?: number
  instances?: Record<number, EffectInstance>
  icon?: string
}

export interface SelectionData extends BasicValues {
  units: Record<number, BasicValues>
  buffs: Record<string, SelectedBuff>
  totalValueSum: number
  totalUnitTime?: number
  [key: string]: unknown
}
