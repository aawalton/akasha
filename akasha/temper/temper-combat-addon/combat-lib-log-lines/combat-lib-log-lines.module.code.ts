import {
  type LIBCOMBAT_EVENT_BOSSHP,
  LIBCOMBAT_EVENT_DAMAGE_OUT,
  LIBCOMBAT_EVENT_DAMAGE_SELF,
  type LIBCOMBAT_EVENT_DEATH,
  LIBCOMBAT_EVENT_EFFECTS_IN,
  LIBCOMBAT_EVENT_GROUPEFFECTS_OUT,
  LIBCOMBAT_EVENT_HEAL_OUT,
  LIBCOMBAT_EVENT_HEAL_SELF,
  LIBCOMBAT_EVENT_MESSAGES,
  LIBCOMBAT_EVENT_PERFORMANCE,
  LIBCOMBAT_EVENT_PLAYERSTATS,
  LIBCOMBAT_EVENT_PLAYERSTATS_ADVANCED,
  LIBCOMBAT_EVENT_QUICKSLOT,
  LIBCOMBAT_EVENT_RESOURCES,
  LIBCOMBAT_EVENT_SKILL_TIMINGS,
} from "@akasha/temper-combat-addon/combat-lib-constants"

export type RawLogLine = readonly (number | string | undefined)[]

export type DamageLogId = typeof LIBCOMBAT_EVENT_DAMAGE_OUT | 5 | typeof LIBCOMBAT_EVENT_DAMAGE_SELF

export type HealLogId = typeof LIBCOMBAT_EVENT_HEAL_OUT | 8 | typeof LIBCOMBAT_EVENT_HEAL_SELF

export type EffectLogId =
  | typeof LIBCOMBAT_EVENT_EFFECTS_IN
  | 11
  | 12
  | typeof LIBCOMBAT_EVENT_GROUPEFFECTS_OUT

export type PlayerStatsLogId =
  | typeof LIBCOMBAT_EVENT_PLAYERSTATS
  | typeof LIBCOMBAT_EVENT_PLAYERSTATS_ADVANCED

export type DamageLogLine = [
  messageType: DamageLogId,
  timems: number,
  result: number,
  sourceUnitId: number,
  targetUnitId: number,
  abilityId: number,
  hitValue: number,
  damageType: number,
  overflow: number,
]

export type HealLogLine = [
  messageType: HealLogId,
  timems: number,
  result: number,
  sourceUnitId: number,
  targetUnitId: number,
  abilityId: number,
  hitValue: number,
  powerType: number,
  overflow: number | undefined,
]

export type EffectLogLine = [
  messageType: EffectLogId,
  timems: number,
  unitId: number | undefined,
  abilityId: number,
  changeType: number,
  effectType: number,
  stacks: number | undefined,
  sourceType: number | undefined,
  effectSlot: number,
  hitValue?: number,
]

export type PlayerStatsLogLine = [
  messageType: PlayerStatsLogId,
  timems: number,
  statchange: number,
  newvalue: number,
  statId: number,
]

export type ResourcesLogLine = [
  messageType: typeof LIBCOMBAT_EVENT_RESOURCES,
  timems: number,
  abilityId: number | undefined,
  powerValueChange: number,
  powerType: number,
  powerValue: number,
]

export type MessagesLogLine = [
  messageType: typeof LIBCOMBAT_EVENT_MESSAGES,
  timems: number,
  combatMessage: number | string,
  value: number,
]

export type DeathLogLine = [
  messageType: typeof LIBCOMBAT_EVENT_DEATH,
  timems: number,
  state: number,
  unitId: number,
  otherId?: number,
]

export type SkillTimingsLogLine = [
  messageType: typeof LIBCOMBAT_EVENT_SKILL_TIMINGS,
  timems: number,
  reducedslot: number,
  abilityId: number,
  skillStatus: number,
  skillDelay: number | undefined,
  skillDuration?: number,
]

export type BossHpLogLine = [
  messageType: typeof LIBCOMBAT_EVENT_BOSSHP,
  timems: number,
  bossId: number,
  currenthp: number,
  maxhp: number,
]

export type PerformanceLogLine = [
  messageType: typeof LIBCOMBAT_EVENT_PERFORMANCE,
  timems: number,
  avg: number,
  min: number,
  max: number,
  ping: number,
]

export type QuickslotLogLine = [
  messageType: typeof LIBCOMBAT_EVENT_QUICKSLOT,
  timems: number,
  itemLink: string,
]

export type LogLine =
  | DamageLogLine
  | HealLogLine
  | EffectLogLine
  | PlayerStatsLogLine
  | ResourcesLogLine
  | MessagesLogLine
  | DeathLogLine
  | SkillTimingsLogLine
  | BossHpLogLine
  | PerformanceLogLine
  | QuickslotLogLine

export function isLogLine(this: void, line: RawLogLine): line is LogLine {
  const id = line[0]
  return (
    typeof id === "number" &&
    ((id >= LIBCOMBAT_EVENT_DAMAGE_OUT && id <= LIBCOMBAT_EVENT_PERFORMANCE) ||
      id === LIBCOMBAT_EVENT_QUICKSLOT)
  )
}

export function isDamageLogLine(this: void, line: RawLogLine): line is DamageLogLine {
  const id = line[0]
  return (
    typeof id === "number" && id >= LIBCOMBAT_EVENT_DAMAGE_OUT && id <= LIBCOMBAT_EVENT_DAMAGE_SELF
  )
}

export function isHealLogLine(this: void, line: RawLogLine): line is HealLogLine {
  const id = line[0]
  return typeof id === "number" && id >= LIBCOMBAT_EVENT_HEAL_OUT && id <= LIBCOMBAT_EVENT_HEAL_SELF
}

export function isEffectLogLine(this: void, line: RawLogLine): line is EffectLogLine {
  const id = line[0]
  return (
    typeof id === "number" &&
    id >= LIBCOMBAT_EVENT_EFFECTS_IN &&
    id <= LIBCOMBAT_EVENT_GROUPEFFECTS_OUT
  )
}

export function isPlayerStatsLogLine(this: void, line: RawLogLine): line is PlayerStatsLogLine {
  return line[0] === LIBCOMBAT_EVENT_PLAYERSTATS || line[0] === LIBCOMBAT_EVENT_PLAYERSTATS_ADVANCED
}

export function isResourcesLogLine(this: void, line: RawLogLine): line is ResourcesLogLine {
  return line[0] === LIBCOMBAT_EVENT_RESOURCES
}

export function isMessagesLogLine(this: void, line: RawLogLine): line is MessagesLogLine {
  return line[0] === LIBCOMBAT_EVENT_MESSAGES
}

export function isSkillTimingsLogLine(this: void, line: RawLogLine): line is SkillTimingsLogLine {
  return line[0] === LIBCOMBAT_EVENT_SKILL_TIMINGS
}

export function isPerformanceLogLine(this: void, line: RawLogLine): line is PerformanceLogLine {
  return line[0] === LIBCOMBAT_EVENT_PERFORMANCE
}

export function isQuickslotLogLine(this: void, line: RawLogLine): line is QuickslotLogLine {
  return line[0] === LIBCOMBAT_EVENT_QUICKSLOT
}
