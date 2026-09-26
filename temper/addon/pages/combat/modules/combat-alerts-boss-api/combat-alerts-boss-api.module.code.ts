import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import type { OptionColor } from "akasha/temper/addon/pages/combat/modules/combat-alerts-options/combat-alerts-options.module.code.ts"

export type BossStages = Record<number, string>

export interface BossThresholds {
  [percentage: number]: string
  [bossTag: `boss${number}`]: BossStages | undefined
  normHealth?: number
  vetHealth?: number
  hmHealth?: number
  Normal?: BossThresholds
  Veteran?: BossThresholds
  Hardmode?: BossThresholds
}

export type ThresholdsChangeListener = (this: void, name: string, isAdded: boolean) => void

export type BossHealthFunction = (
  this: void
) => LuaMultiReturn<[powerValue: number, powerMax: number, powerEffectiveMax: number]>

export interface SpoofedBoss {
  name: string
  getHealthFunction: BossHealthFunction
  fgColor: OptionColor
  bgColor: OptionColor
}

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchBossHealthBar {
    AddThresholdOverride: (this: void, name: string, thresholds: BossThresholds) => void
    RemoveThresholdOverride: (this: void, name: string) => void
    GetThresholdOverride: (this: void, name: string) => BossThresholds | undefined
    GetUnitNameIfExists: (this: void, unitTag: string) => string | undefined
    GetUnitHealths: (
      this: void,
      unitTag: string
    ) => LuaMultiReturn<[powerValue: number, powerMax: number, powerEffectiveMax: number]>
    GetFirstValidBossTag: (this: void) => string
    OnPowerUpdate: (
      this: void,
      eventCode: number | undefined,
      unitTag: string,
      powerIndex: number | undefined,
      powerType: number | undefined,
      powerValue: number,
      powerMax: number,
      powerEffectiveMax: number
    ) => void
    ShowOrHideBars: (this: void, showAllForMoving?: boolean, onlyReanchorStages?: boolean) => void
    OnBossesChanged: (this: void, boss1IsSame?: boolean) => void
    UpdateColors: (this: void) => void
    UpdateRotation: (this: void, showAllForMoving?: boolean) => void
    GetBossThresholds: (this: void, optionalBossName?: string) => BossThresholds | undefined
    thresholdsChangeListeners: Record<string, ThresholdsChangeListener>
    RegisterThresholdsChangeListener: (
      this: void,
      name: string,
      listener: ThresholdsChangeListener
    ) => void
    UnregisterThresholdsChangeListener: (this: void, name: string) => void
    thresholds: Record<string, BossThresholds>
    eaThresholds: Record<string, BossThresholds>
    soloDungeonThresholds: Record<string, BossThresholds>
    spoofedBosses: Record<string, SpoofedBoss>
    UpdateBar: (
      this: void,
      unitTag: string,
      unitAttributeVisual: number,
      hide: boolean,
      value: number,
      maxValue: number
    ) => void
    UpdateAttributeVisuals: (this: void, unitTag: string) => void
    RegisterVisualizers: (this: void) => void
    UnregisterVisualizers: (this: void) => void
  }

  interface CrutchHub {
    SetBarColors: (
      this: void,
      index: number | string,
      fgColor: OptionColor | undefined,
      bgColor: OptionColor | undefined
    ) => void
    SpoofBoss: (
      this: void,
      unitTag: string,
      name: string,
      getHealthFunction: BossHealthFunction,
      fgColor?: OptionColor,
      bgColor?: OptionColor
    ) => void
    UnspoofBoss: (this: void, unitTag: string) => void
    UpdateSpoofedBossHealth: (this: void, unitTag: string, value: number, max: number) => void
    TrackUnitForSpoofing: (
      this: void,
      unitId: number,
      name: string,
      unitTag: string,
      maxHealth: number,
      fgColor?: OptionColor,
      bgColor?: OptionColor,
      initialHealth?: number
    ) => void
    UntrackUnitForSpoofing: (this: void, unitId: number) => void
    TrackUnitForReticleSyncing: (this: void, name: string, unitId: number) => void
    UntrackUnitForReticleSyncing: (this: void, name: string) => void
  }
}

const BHB = CRUTCH.BossHealthBar

export function dbg(this: void, msg: string): undefined {
  CRUTCH.dbgSpam(string.format("|c8888FF[BHB]|r %s", msg))
}

function getThresholdsTable(this: void, zoneId: number): Record<string, BossThresholds> {
  if (zoneId === 1436) {
    return BHB.eaThresholds
  } else if (zoneId === 1592 || zoneId === 1593) {
    return BHB.soloDungeonThresholds
  } else {
    return BHB.thresholds
  }
}

BHB.GetBossThresholds = function (this: void, optionalBossName) {
  const bossName = zo_strformat(
    SI_UNIT_NAME,
    optionalBossName ?? BHB.GetUnitNameIfExists(BHB.GetFirstValidBossTag())
  )
  let data: BossThresholds | undefined
  const thresholdOverride = BHB.GetThresholdOverride(bossName)
  if (thresholdOverride !== undefined) {
    data = thresholdOverride
  } else {
    data = getThresholdsTable(GetZoneId(GetUnitZoneIndex("player")))[bossName]
  }

  const [, powerMax] = BHB.GetUnitHealths(BHB.GetFirstValidBossTag())
  if (data === undefined) {
    dbg(string.format("No data found for %s", bossName))
  } else if (powerMax === data.hmHealth && data.Hardmode !== undefined) {
    dbg(string.format("%s hp matched HARDMODE %d", bossName, powerMax))
    data = data.Hardmode
  } else if (powerMax === data.vetHealth && data.Veteran !== undefined) {
    dbg(string.format("%s hp matched VETERAN %d", bossName, powerMax))
    data = data.Veteran
  } else if (powerMax === data.normHealth && data.Normal !== undefined) {
    dbg(string.format("%s hp matched NORMAL %d", bossName, powerMax))
    data = data.Normal
  } else if (data.Hardmode !== undefined) {
    dbg(string.format("No hp match for %s %d, but found Hardmode data", bossName, powerMax))
    data = data.Hardmode
  } else if (data.Veteran !== undefined) {
    dbg(string.format("No hp match for %s %d, but found Veteran data", bossName, powerMax))
    data = data.Veteran
  } else if (data.Normal !== undefined) {
    dbg(string.format("No hp match for %s %d, but found Normal data", bossName, powerMax))
    data = data.Normal
  } else {
    dbg(string.format("No difficulty data found for %s %d, using common data", bossName, powerMax))
  }

  return data
}

const THRESHOLDS_CHANGE_LISTENERS: Record<string, ThresholdsChangeListener> = {}
BHB.thresholdsChangeListeners = THRESHOLDS_CHANGE_LISTENERS

BHB.RegisterThresholdsChangeListener = function (this: void, name, listener) {
  THRESHOLDS_CHANGE_LISTENERS[name] = listener
}

BHB.UnregisterThresholdsChangeListener = function (this: void, name) {
  delete THRESHOLDS_CHANGE_LISTENERS[name]
}
