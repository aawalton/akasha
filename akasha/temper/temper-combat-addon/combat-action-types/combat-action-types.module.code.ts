import type { DurSource } from "@akasha/temper-combat-addon/combat-action-levels"

export interface Ability {
  id: number
  name: string
  showName: string
  icon: string
  icon2?: string
  icon3?: string
  progressionName?: string
  description: string
  type: number
}

export interface Effect {
  ability: Ability
  unitTag: string
  unitId: number
  startTime: number
  endTime: number
  duration: number
  stackCount: number
  tickRate?: number
  level: number
  levelIsLow: boolean
  ignored: boolean
  ignorableDebuff: boolean
  isCrux: boolean
  combatEventId?: number
  activated: boolean
  stageInfo?: string
}

export interface ActionFlags {
  forArea: boolean
  forEnemy: boolean
  forGround: boolean
  forSelf: boolean
  forTank: boolean
  shifted: boolean
  onlyOneTarget: boolean
}

export interface Action {
  sn: number
  slotNum: number
  hotbarCategory: number
  ability: Ability
  relatedAbilityList: number[]
  channeled: boolean
  castTime: number
  startTime: number
  duration: number
  configDuration?: number
  inheritDuration?: number
  descriptionDuration?: number
  descriptionNums: number[]
  endTime: number
  effectList: Effect[]
  effectEndTimes: number[]
  stackEffect?: Effect
  stackCount: number
  stackEffect2?: Effect
  tickEffect?: Effect
  channelStartTime?: number
  channelEndTime?: number
  channelUnitId?: number
  lastEffectTime: number
  oldAction?: Action
  newAction?: Action
  targetId?: number
  targetOut: boolean
  fake: boolean
  saved: boolean
  flags: ActionFlags
  groundFirstEffectId?: number
  data: Record<string, number>
}

export interface DurationResult {
  duration: number
  source: DurSource
}
