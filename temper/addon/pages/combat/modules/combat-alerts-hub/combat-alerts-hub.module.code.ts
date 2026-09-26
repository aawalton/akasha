import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import type { CrutchOptions } from "akasha/temper/addon/pages/combat/modules/combat-alerts-options/combat-alerts-options.module.code.ts"

export type CombatEventCallback = (
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

export type EffectChangedCallback = (
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
  buffType: string,
  effectType: number,
  abilityType: number,
  statusEffectType: number,
  unitName: string,
  unitId: number,
  abilityId: number,
  sourceType: number
) => void

export interface CrutchStyle {
  GetAlertFont: (this: void, size: number) => string
  GetDamageableFont: (this: void, size: number) => string
  prominentFont: string
  GetBHBFont: (this: void, size: number) => string
  GetMarkerFont: (this: void, size: number) => string
  GetInfoPanelFont: (this: void, size: number) => string
}

export type ZoneRegistration = (this: void, isSameZone: boolean) => void

export interface CrutchRegistered {
  begin: boolean
  test: boolean
  enemy: boolean
  others: boolean
  interrupts: boolean
}

// biome-ignore lint/suspicious/noEmptyInterface: the modules filling this namespace augment it
export interface CrutchConstants {}

export interface CrutchBossHealthBar {
  Initialize: (this: void) => void
  UpdateScale: (this: void, showAllForMoving?: boolean) => void
  DumpMechanicControls: (this: void) => void
}

export interface CrutchInfoPanel {
  ApplyStyle: (this: void, style: CrutchStyle) => void
}

// biome-ignore lint/suspicious/noEmptyInterface: the modules filling this namespace augment it
export interface CrutchDrawingAnimation {}

export interface CrutchDrawingModel {
  InitializeGrave: (this: void) => void
}

export interface CrutchDrawing {
  Animation: CrutchDrawingAnimation
  Model: CrutchDrawingModel
  InitializeRenderSpace: (this: void) => void
  InitializeSpace: (this: void) => void
  InitializeAttachedIcons: (this: void) => void
  CircleJet: (
    this: void,
    text?: string,
    duration?: number,
    radius?: number,
    cycleTime?: number
  ) => string
  DumpUnitIcons: (this: void) => void
  ClearPoop: (this: void) => void
  TestPoop: (this: void, radius: number) => void
}

// biome-ignore lint/suspicious/noEmptyInterface: the modules filling this namespace augment it
export interface CrutchBroadcast {}
// biome-ignore lint/suspicious/noEmptyInterface: the modules filling this namespace augment it
export interface CrutchAsylumSanctorium {}
// biome-ignore lint/suspicious/noEmptyInterface: the modules filling this namespace augment it
export interface CrutchCloudrest {}
// biome-ignore lint/suspicious/noEmptyInterface: the modules filling this namespace augment it
export interface CrutchDreadsailReef {}
// biome-ignore lint/suspicious/noEmptyInterface: the modules filling this namespace augment it
export interface CrutchOsseinCage {}
// biome-ignore lint/suspicious/noEmptyInterface: the modules filling this namespace augment it
export interface CrutchRockgrove {}
// biome-ignore lint/suspicious/noEmptyInterface: the modules filling this namespace augment it
export interface CrutchSunspire {}

export interface CrutchHub {
  name: string
  version: string
  unlock: boolean
  registered: CrutchRegistered
  savedOptions: CrutchOptions
  accountSVs: CrutchOptions
  defaultOptions: CrutchOptions
  zoneId: number | undefined
  groupInCombat: boolean
  groupIdToTag: Record<number, string>
  groupTagToId: Record<string, number>
  majorCowardiceUnitIds: Record<number, boolean>
  playerGroupTag: string

  BossHealthBar: CrutchBossHealthBar
  Drawing: CrutchDrawing
  Constants: CrutchConstants
  InfoPanel: CrutchInfoPanel
  Broadcast: CrutchBroadcast
  AsylumSanctorium: CrutchAsylumSanctorium
  Cloudrest: CrutchCloudrest
  DreadsailReef: CrutchDreadsailReef
  OsseinCage: CrutchOsseinCage
  Rockgrove: CrutchRockgrove
  Sunspire: CrutchSunspire

  SavePosition: (this: void) => void
  dbgOther: (this: void, text: unknown) => void
  dbgSpam: (this: void, text: unknown) => void
  OnPlayerActivated: (this: void) => void

  msg: (this: void, message: unknown) => void
  Warn: (this: void, message: unknown) => void
  ShowQueuedMessages: (this: void) => void
  GetCapitalizedString: (this: void, text: string) => string
  GetSquaredDistance: (
    this: void,
    x1: number,
    y1: number,
    z1: number,
    x2: number,
    y2: number,
    z2: number
  ) => number
  GetUnitTagsDistance: (this: void, unitTag1: string, unitTag2: string) => number
  ConvertHSLToRGB: (
    this: void,
    h: number,
    s: number,
    l: number
  ) => LuaMultiReturn<[r: number, g: number, b: number]>
  IsValidRole: (this: void, role: number) => boolean
  IsRoleSet: (this: void, setting: number, role: number) => boolean | undefined
  RoleValueToTable: (this: void, setting: number) => number[]
  RoleTableToValue: (this: void, roles: readonly number[]) => number
  ConvertRoleStringsToValue: (this: void, values: readonly string[]) => number
  ConvertRoleValueToStrings: (this: void, setting: number) => string[]
  ConvertRoleValueToConsoleString: (this: void, setting: number) => string | undefined
  GetSpeshulDate: (this: void) => number
  DecorateNotificationText: (this: void, textLabel: string) => string
  CheckGroupBuffs: (
    this: void,
    idsToCallbacks: Record<number, (this: void, unitTag: string, hasBuff: boolean) => void>,
    finalCallback: (this: void, unitTag: string, hasAnyBuffs: boolean) => void
  ) => void
  PlayMultiSound: (
    this: void,
    sound: string,
    volume?: number,
    times?: number,
    delay?: number,
    attenuate?: boolean
  ) => void
  GetGroupTagNumber: (this: void, unitTag: string) => number

  RegisterForEffectChanged: (
    this: void,
    suffix: string,
    callback: EffectChangedCallback,
    abilityId?: number,
    unitTagPrefix?: string
  ) => void
  UnregisterForEffectChanged: (this: void, suffix: string) => void
  RegisterForCombatEvent: (
    this: void,
    suffix: string,
    callback: CombatEventCallback,
    result?: number,
    abilityId?: number,
    sourceType?: number,
    targetType?: number
  ) => void
  UnregisterForCombatEvent: (this: void, suffix: string) => void

  GetStyles: (this: void) => CrutchStyle
  InitializeStyles: (this: void) => void

  RegisterEnteredGroupCombatListener: (
    this: void,
    name: string,
    listener: (this: void) => void
  ) => void
  RegisterExitedGroupCombatListener: (
    this: void,
    name: string,
    listener: (this: void) => void
  ) => void
  UnregisterEnteredGroupCombatListener: (this: void, name: string) => void
  UnregisterExitedGroupCombatListener: (this: void, name: string) => void
  RegisterBossChangedListener: (
    this: void,
    name: string,
    listener: (this: void, boss1IsSame: boolean) => void
  ) => void
  UnregisterBossChangedListener: (this: void, name: string) => void
  RegisterUpdateListener: (this: void, name: string, listener: (this: void) => void) => void
  UnregisterUpdateListener: (this: void, name: string) => void
  RegisterUnitTagListener: (
    this: void,
    name: string,
    listener: (this: void, reason: string) => void
  ) => void
  UnregisterUnitTagListener: (this: void, name: string) => void
  OnTrialComplete: (
    this: void,
    eventCode: number | undefined,
    trialName: string | undefined,
    score: number,
    totalTime: number
  ) => void
  InitializeGlobalEvents: (this: void) => void
  UninitializeGlobalEvents: (this: void) => void

  ToggleGeneralAlerts: (this: void) => void

  AddProminentDefaults: (this: void) => void
  AddEffectDefaults: (this: void) => void
  InitProminentV2Options: (this: void) => void
  CreateSettingsMenu: (this: void) => void
  UnlockUI: (this: void, value: boolean) => void
  RegisterBegin: (this: void) => void
  RegisterGained: (this: void) => void
  RegisterOthers: (this: void) => void
  RegisterInterrupts: (this: void) => void
  RegisterTest: (this: void) => void
  RegisterStacks: (this: void) => void
  RegisterEffectChanged: (this: void) => void
  RegisterChannels: (this: void) => void
  RegisterProminents: (this: void, zoneId: number) => void
  UnregisterProminents: (this: void, zoneId: number | undefined) => void
  RegisterEffects: (this: void, zoneId: number) => void
  UnregisterEffects: (this: void, zoneId: number | undefined) => void
  InitializeDamageable: (this: void) => void
  InitializeDamageTaken: (this: void) => void
  InitializeCC: (this: void) => void
  InitializeLineRenderSpace: (this: void) => void
  InitializeAbilityOverlay: (this: void) => void
  InitializeInfoPanel: (this: void) => void
  InitializeBroadcast: (this: void) => void
  GetSlotTrueBoundId: (this: void, slotIndex: number, hotbarCategory: number) => number
  ToggleHealthDebug: (this: void) => void

  ToggleTempestIcons: (this: void) => void
  IsInShadowWorld: (this: void, unitTag: string) => boolean
  IsInNahvPortal: (this: void, unitTag: string) => boolean
  IsInVantonPortal: (this: void, unitTag: string) => boolean
  UpdateSpearsDisplay: (
    this: void,
    spearsRevealed: number,
    spearsSent: number,
    orbsDunked: number
  ) => void
  TryEnablingTaleriaCleave: (this: void) => void
  OnGroupMemberCurseReceived: (
    this: void,
    unitTag: string,
    x: number,
    y: number,
    z: number,
    heading: number
  ) => void
}

export const ADDON_NAME = "TemperCombatAlerts"

export const CRUTCH = {
  name: ADDON_NAME,
  version: "2.26.0",
  unlock: false,
  registered: {
    begin: false,
    test: false,
    enemy: false,
    others: false,
    interrupts: false,
  },
  groupInCombat: false,
  groupIdToTag: {},
  groupTagToId: {},
  majorCowardiceUnitIds: {},
  playerGroupTag: "player",
  BossHealthBar: {},
  Drawing: {
    Animation: {},
    Model: {},
  },
  Constants: {},
  InfoPanel: {},
  Broadcast: {},
  AsylumSanctorium: {},
  Cloudrest: {},
  DreadsailReef: {},
  OsseinCage: {},
  Rockgrove: {},
  Sunspire: {},
} as CrutchHub
