export interface GroupInfo {
  nameToId: Record<string, number>
  tagToId: Record<string, number>
  nameToTag: Record<string, string>
  nameToDisplayname: Record<string, string>
}

export interface StatusEffectBonusData {
  arcanistBonus: Record<number, number>
  charged: Record<number, number>
  heartlandBonus: number
  wealdBonus: number
  destro: Record<number, number>
  CP: number
  focusedEfforts: number
}

export type LastAbilityEntry = [
  timems: number,
  abilityId: number,
  powerValueChange: number,
  powerType: number,
]

export interface LibCombatData {
  skillBars: Record<number, Record<number, number>>
  scribedSkills: Record<number, number[]>
  inCombat: boolean
  inGroup: boolean
  rawPlayername: string
  playername: string
  accountname: string
  playerid: number | undefined
  bossInfo: Record<string, number>
  groupInfo: GroupInfo
  PlayerPets: Record<number, unknown>
  lastabilities: LastAbilityEntry[]
  backstabber: number
  critBonusMundus: number
  bar: number
  resources: Record<number, number>
  stats: Record<number, number>
  advancedStats: Record<number, Record<number, number>>
  currentQuickslotIndex: number
  statusEffectBonus: StatusEffectBonusData | undefined
  isUIActivated: boolean
  LoadCustomizations: ((this: void) => void) | undefined
}

export interface UnitEntry {
  unitId: number
  name: string
  displayname: string | undefined
  unitTag: string | undefined
  unitType: number
  isFriendly: boolean
  isDead: boolean | undefined
  damageOutTotal: number
  groupDamageOut: number
  dpsstart: number | undefined
  dpsend: number | undefined
  starttime: number | undefined
  endtime: number | undefined
  zenEffectSlot: number | undefined
  stacksOfZen: number
  forceOfNature: Record<number, boolean | undefined>
  forceOfNatureStacks: number
  bossId: number | undefined
  isTrialDummy: boolean | undefined
  type?: number
}

export interface UnitInfo {
  unitId: number
  name: string
  displayname: string | undefined
  unitTag: string | undefined
  unitType: number
}

export type CPStarEntry = [savedPoints: number, starType: number]

export interface CPDisciplineData {
  total: number
  stars: Record<number, CPStarEntry>
  slotted: Record<number, boolean>
}

export interface CPData {
  version: number
  [disciplineId: number]: CPDisciplineData
}

export interface FightCharData {
  name: string
  raceId: number
  gender: number
  classId: number
  level: number
  roleId: number
  CPtotal: number
  APHealth: number
  APMagicka: number
  APStam: number
  Curse: number
  SkillLines: Record<number, number>
  skillBars: Record<number, Record<number, number>> | undefined
  scribedSkills: Record<number, number[]> | undefined
  passiveSkills: number[] | undefined
  equip: Record<number, string> | undefined
}

export type GroupLogEntry = [unitId: number, value: number, action: "dmg" | "heal"]

export interface Fight {
  char: string
  combatstart: number
  combatend: number
  combattime: number
  dpsstart: number | undefined
  dpsend: number | undefined
  hpsstart: number | undefined
  hpsend: number | undefined
  dpstime: number
  hpstime: number
  units: Record<number, UnitEntry>
  grplog: GroupLogEntry[]
  groupDamageOut: number
  groupDamageIn: number
  groupHealingOut: number
  groupHealingIn: number
  groupDPSOut: number
  groupDPSIn: number
  groupHPSOut: number
  groupHPSIn: number
  damageOutTotal: number
  healingOutTotal: number
  healingOutAbsolute: number
  damageInTotal: number
  damageInShielded: number
  healingInTotal: number
  DPSOut: number
  HPSOut: number
  HPSAOut: number
  DPSIn: number
  HPSIn: number
  group: boolean
  playerid: number | undefined
  bosses: Record<number, number>
  dataVersion: number
  special: Record<string, unknown>
  prepared: boolean | undefined
  date: number | undefined
  time: string | undefined
  zone: string | undefined
  subzone: string | undefined
  zoneId: number | undefined
  ESOversion: string | undefined
  APIversion: number | undefined
  account: string | undefined
  charData: FightCharData | undefined
  CP: CPData | undefined
  startBar: number | undefined
  isWipe: boolean | undefined
  bossfight: boolean | undefined
  bossname: string | undefined
  starttime: number | undefined
  endtime: number | undefined
  activetime: number | undefined
}

export interface FightRecapData {
  DPSOut: number
  DPSIn: number
  HPSOut: number
  OHPSOut: number
  HPSAOut: number
  HPSIn: number
  overHealingOutTotal: number
  healingOutTotal: number
  damageOutTotal: number
  dpstime: number
  hpstime: number
  group: boolean
  groupDPSOut: number
  groupDPSIn: number
  groupHPSOut: number
  damageOutTotalGroup: number
  bossfight: boolean
  bossFight: boolean
  bossDPSOut: number
  bossDamageTotal: number
  bossDPSOutGroup: number
  bossDamageTotalGroup: number
  bossTime: number
}

export interface GroupRecapData {
  groupDPSOut: number
  groupDPSIn: number
  groupHPSOut: number
  dpstime: number
  hpstime: number
}

export type DeathRecapLogLine = [
  timems: number,
  result: number,
  source: number | string,
  abilityId: number,
  damageType: number,
  hitValue: number,
  overflow: number,
  health: number | undefined,
  healthMax: number | undefined,
  magicka: number | undefined,
  stamina: number | undefined,
]

export interface UnitCache {
  unitId: number
  nextKey: number | undefined
  maxlength: number | undefined
  cache: DeathRecapLogLine[] | undefined
  timems: number | undefined
  health: number | undefined
  healthMax: number | undefined
  magicka: number | undefined
  magickaMax: number | undefined
  stamina: number | undefined
  staminaMax: number | undefined
  log: DeathRecapLogLine[] | undefined
  name: string | undefined
  displayname: string | undefined
  unitTag: string | undefined
  unitType: number | undefined
  bossname: string | undefined
  zoneId: number | undefined
  fighttime: number | undefined
  combatstart: number | undefined
}
