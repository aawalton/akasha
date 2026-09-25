export type CombatEventCallback = (this: void, eventId: number, ...args: never[]) => void

export type BufferedEffectLogData = [
  eventId: number,
  timems: number,
  unitId: number,
  abilityId: number,
  changeType: number,
  effectType: number,
  stacks: number,
  sourceType: number,
  effectSlot: number,
]

export type EffectBufferEntry = [
  endTime: number,
  logdata: BufferedEffectLogData,
  abilityType: number,
]

export type DamageShieldEntry = [
  timems: number,
  sourceUnitId: number,
  targetUnitId: number,
  hitValue: number,
]

export type SkillRegistrationData = [
  convertedId: number,
  result: number | undefined,
  convertedId2?: number,
  result2?: number,
]

export type CombatEventHandler = (
  this: void,
  eventCode: number,
  result: number,
  isError: boolean,
  abilityName: string,
  abilityGraphic: number,
  abilityActionSlotType: number,
  sourceName: string,
  sourceType: number,
  targetName: string,
  targetType: number,
  hitValue: number,
  powerType: number,
  damageType: number,
  log: boolean,
  sourceUnitId: number,
  targetUnitId: number,
  abilityId: number,
  overflow: number
) => void

export type EffectChangedHandler = (
  this: void,
  eventCode: number,
  changeType: number,
  effectSlot: number,
  effectName: string,
  unitTag: string,
  beginTime: number,
  endTime: number,
  stackCount: number,
  iconName: string,
  buffType: number,
  effectType: number,
  abilityType: number,
  statusEffectType: number,
  unitName: string,
  unitId: number,
  abilityId: number,
  sourceType: number
) => void
