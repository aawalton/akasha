import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-utils/combat-alerts-utils.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-info-panel/combat-alerts-info-panel.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-info-panel-utils/combat-alerts-info-panel-utils.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-asylum-mini-health-bars/combat-alerts-asylum-mini-health-bars.module.code.ts"
import {
  type CombatEventCallback,
  CRUTCH,
  type EffectChangedCallback,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import { crutchString } from "akasha/temper/addon/pages/combat/modules/combat-alerts-lang/combat-alerts-lang.module.code.ts"

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchAsylumSanctorium {
    Test: (this: void) => void
    OnLlothisDetectedPanel: (this: void) => void
    OnLlothisDormantPanel: (this: void, changeType: number) => void
    OnFelmsDetectedPanel: (this: void) => void
    OnFelmsDormantPanel: (this: void, changeType: number) => void
    RegisterMiniPanel: (this: void) => void
    UnregisterMiniPanel: (this: void) => void
  }
}

const AS = CRUTCH.AsylumSanctorium
const IP = CRUTCH.InfoPanel

const felmsName = zo_strformat("<<C:1>>", crutchString("CRUTCH_BHB_SAINT_FELMS_THE_BOLD"))
const llothisName = zo_strformat("<<C:1>>", crutchString("CRUTCH_BHB_SAINT_LLOTHIS_THE_PIOUS"))
const boltsName = `   |c3a9dd6${GetAbilityName(95687)}: `
const coneName = `   |c64c200${GetAbilityName(95545)}: `
const fartName = `   |c9447ff${GetAbilityName(98356)}: `

const PANEL_LLOTHIS_HEADER_INDEX = 5
const PANEL_LLOTHIS_ENRAGE_INDEX = 6
const PANEL_LLOTHIS_BOLTS_INDEX = 7
const PANEL_LLOTHIS_CONE_INDEX = 8
const PANEL_LLOTHIS_FART_INDEX = 9
const PANEL_DUMMY_INDEX = 10
const PANEL_FELMS_HEADER_INDEX = 11
const PANEL_FELMS_ENRAGE_INDEX = 12
const PANEL_FELMS_TELEPORT_INDEX = 13

const SUBITEM_SCALE = 1
const HEADER_SCALE = 0.7

function panelOptions(this: void) {
  return CRUTCH.savedOptions.asylumsanctorium.panel
}

function isSettingEnabled(this: void, setting: number): boolean {
  const isRoleSet = CRUTCH.IsRoleSet(setting, GetSelectedLFGRole())
  if (isRoleSet === undefined) return true
  return isRoleSet
}

function decorateElapsedTimer(this: void, ms: number): string {
  const [colons] = FormatTimeSeconds(ms / 1000, TIME_FORMAT_STYLE_COLONS)
  if (ms >= 180000) {
    return `|cFF0000${colons}`
  } else if (ms >= 170000) {
    return `|cFFAA00${colons}`
  } else if (ms >= 135000) {
    return `|cFFFF00${colons}`
  } else {
    return `|cFFFFFF${colons}`
  }
}

let llothisDormant = false
let llothisDisplaying = false
function startLlothisHeader(this: void): undefined {
  if (!isSettingEnabled(panelOptions().showLlothisHeader)) return
  llothisDisplaying = true
  IP.CountUp(
    PANEL_LLOTHIS_HEADER_INDEX,
    `|cCCCCCC${llothisName}: `,
    HEADER_SCALE,
    decorateElapsedTimer
  )
}
function countDownToLlothis(this: void): undefined {
  if (!isSettingEnabled(panelOptions().showLlothisHeader)) return
  llothisDisplaying = true
  IP.CountDownDuration(PANEL_LLOTHIS_HEADER_INDEX, `|cCCCCCC${llothisName}: `, 45000, HEADER_SCALE)
}

function setBolts(this: void, msUntil: number): undefined {
  if (!isSettingEnabled(panelOptions().showLlothisBolts)) return
  llothisDisplaying = true
  IP.CountDownDuration(PANEL_LLOTHIS_BOLTS_INDEX, boltsName, msUntil, SUBITEM_SCALE)
}

function setCone(this: void, msUntil: number): undefined {
  if (!isSettingEnabled(panelOptions().showLlothisCone)) return
  llothisDisplaying = true
  IP.CountDownDuration(PANEL_LLOTHIS_CONE_INDEX, coneName, msUntil, SUBITEM_SCALE)
}

function setFart(this: void, msUntil: number): undefined {
  if (!isSettingEnabled(panelOptions().showLlothisTeleport)) return
  llothisDisplaying = true
  IP.CountDownDuration(PANEL_LLOTHIS_FART_INDEX, fartName, msUntil, SUBITEM_SCALE)
}

let felmsDormant = false
function startFelmsHeader(this: void): undefined {
  if (!isSettingEnabled(panelOptions().showFelmsHeader)) return
  if (llothisDisplaying) {
    IP.SetLine(PANEL_DUMMY_INDEX, " ", 0.3)
  }
  IP.CountUp(PANEL_FELMS_HEADER_INDEX, `|cCCCCCC${felmsName}: `, HEADER_SCALE, decorateElapsedTimer)
}
function countDownToFelms(this: void): undefined {
  if (!isSettingEnabled(panelOptions().showFelmsHeader)) return
  IP.CountDownDuration(PANEL_FELMS_HEADER_INDEX, `|cCCCCCC${felmsName}: `, 45000, HEADER_SCALE)
}

const teleportName = `   |cd63a3a${GetAbilityName(99138)}`
let lastFelmsJump = 0
let felmsJumpNumber = 0

function setTeleportCountdown(this: void, msUntil: number): undefined {
  if (!isSettingEnabled(panelOptions().showFelmsTeleport)) return
  EVENT_MANAGER.UnregisterForUpdate(`${CRUTCH.name}FelmsJumpCountdown`)
  IP.CountDownDuration(PANEL_FELMS_TELEPORT_INDEX, `${teleportName}: `, msUntil, SUBITEM_SCALE)
}

function setTeleport(this: void, targetName: string | undefined): undefined {
  if (!isSettingEnabled(panelOptions().showFelmsTeleport)) return
  EVENT_MANAGER.UnregisterForUpdate(`${CRUTCH.name}FelmsJumpCountdown`)
  IP.StopCount(PANEL_FELMS_TELEPORT_INDEX)
  IP.SetLine(
    PANEL_FELMS_TELEPORT_INDEX,
    string.format("%s (%d): |cAAAAAA%s|r", teleportName, felmsJumpNumber, targetName ?? "?"),
    SUBITEM_SCALE
  )
}

function countdownTeleportLater(this: void, targetTime: number): undefined {
  if (!isSettingEnabled(panelOptions().showFelmsTeleport)) return
  EVENT_MANAGER.RegisterForUpdate(`${CRUTCH.name}FelmsJumpCountdown`, 3500, () => {
    EVENT_MANAGER.UnregisterForUpdate(`${CRUTCH.name}FelmsJumpCountdown`)
    IP.CountDownToTargetTime(
      PANEL_FELMS_TELEPORT_INDEX,
      `${teleportName}: `,
      targetTime,
      SUBITEM_SCALE
    )
  })
}

const onFelmsJump: CombatEventCallback = (
  _eventCode,
  _result,
  _isError,
  _abilityName,
  _abilityGraphic,
  _abilityActionSlotType,
  _sourceName,
  _sourceType,
  _targetName,
  _targetType,
  _hitValue,
  _powerType,
  _damageType,
  _log,
  _sourceUnitId,
  targetUnitId
) => {
  if (!felmsDormant) {
    const now = GetGameTimeMilliseconds()
    if (now - lastFelmsJump < 15000) {
      felmsJumpNumber = felmsJumpNumber + 1
    } else {
      felmsJumpNumber = 1
    }

    if (targetUnitId !== undefined && targetUnitId !== 0) {
      const tag = CRUTCH.groupIdToTag[targetUnitId]
      setTeleport(GetUnitDisplayName(tag as string))
      countdownTeleportLater(now + 20500)
    } else {
      setTeleportCountdown(20500)
    }

    lastFelmsJump = now
  }
}

AS.Test = function (this: void) {
  startLlothisHeader()
  setBolts(12000)
  setCone(20000)
  setFart(1000)
  startFelmsHeader()
  setTeleportCountdown(25000)
}

function onBoltsBegin(this: void): undefined {
  if (!isSettingEnabled(panelOptions().showLlothisBolts)) return
  CRUTCH.dbgSpam("bolts begin")
  IP.StopCount(PANEL_LLOTHIS_BOLTS_INDEX)
  IP.SetLine(PANEL_LLOTHIS_BOLTS_INDEX, `${boltsName}|cFF0000INTERRUPT!`, SUBITEM_SCALE)
}

function onBoltsFaded(this: void): undefined {
  CRUTCH.dbgSpam("bolts end")
  if (!llothisDormant) {
    setBolts(12000)
  }
}

const onInterrupted: CombatEventCallback = (
  _eventCode,
  _result,
  _isError,
  _abilityName,
  _abilityGraphic,
  _abilityActionSlotType,
  _sourceName,
  _sourceType,
  _targetName,
  _targetType,
  _hitValue,
  _powerType,
  _damageType,
  _log,
  _sourceUnitId,
  targetUnitId
) => {
  if (AS.llothisId !== targetUnitId) return

  CRUTCH.dbgSpam("bolts interrupted")
  if (!llothisDormant) {
    setBolts(12000)
  }
}

function onFart(this: void): undefined {
  if (!llothisDormant) {
    setFart(25000)
  }
}

const onCone: CombatEventCallback = (
  _eventCode,
  _result,
  _isError,
  _abilityName,
  _abilityGraphic,
  _abilityActionSlotType,
  _sourceName,
  _sourceType,
  _targetName,
  _targetType,
  hitValue
) => {
  if (hitValue !== 2000) return
  CRUTCH.dbgSpam("cone begin")
  setCone(21000)
}

const onEnraged: EffectChangedCallback = (
  _eventCode,
  changeType,
  _effectSlot,
  _effectName,
  _unitTag,
  _beginTime,
  _endTime,
  stackCount,
  _iconName,
  _buffType,
  _effectType,
  _abilityType,
  _statusEffectType,
  _unitName,
  unitId,
  abilityId
) => {
  let panelIndex: number
  if (unitId === AS.llothisId) {
    if (!isSettingEnabled(panelOptions().showLlothisHeader)) return
    panelIndex = PANEL_LLOTHIS_ENRAGE_INDEX
  } else if (unitId === AS.felmsId) {
    if (!isSettingEnabled(panelOptions().showFelmsHeader)) return
    panelIndex = PANEL_FELMS_ENRAGE_INDEX
  } else {
    return
  }

  if (changeType === EFFECT_RESULT_FADED) {
    IP.RemoveLine(panelIndex)
  } else {
    IP.SetLine(
      panelIndex,
      `    ${zo_strformat("|cFF0000<<C:1>>! x<<2>>|r", string.upper(GetAbilityName(abilityId)), stackCount)}`,
      HEADER_SCALE
    )
  }
}

AS.OnLlothisDetectedPanel = function (this: void) {
  startLlothisHeader()
  setBolts(12000)
  setCone(10400)
  setFart(0)
}

AS.OnLlothisDormantPanel = function (this: void, changeType) {
  if (changeType === EFFECT_RESULT_GAINED) {
    countDownToLlothis()
    setBolts(45000)
    setCone(45000)
    setFart(45000)
    llothisDormant = true
  } else if (changeType === EFFECT_RESULT_FADED) {
    startLlothisHeader()
    llothisDormant = false
  }
}

AS.OnFelmsDetectedPanel = function (this: void) {
  startFelmsHeader()
  setTeleportCountdown(10700)
}

AS.OnFelmsDormantPanel = function (this: void, changeType) {
  if (changeType === EFFECT_RESULT_GAINED) {
    countDownToFelms()
    setTeleportCountdown(45000)
    felmsDormant = true
  } else if (changeType === EFFECT_RESULT_FADED) {
    startFelmsHeader()
    felmsDormant = false
  }
}

AS.RegisterMiniPanel = function (this: void) {
  CRUTCH.RegisterForCombatEvent("ASPanelBoltsBegin", onBoltsBegin, ACTION_RESULT_BEGIN, 95585)
  CRUTCH.RegisterForCombatEvent(
    "ASPanelBoltsFaded",
    onBoltsFaded,
    ACTION_RESULT_EFFECT_FADED,
    95585
  )
  CRUTCH.RegisterForCombatEvent("ASPanelInterrupted", onInterrupted, ACTION_RESULT_INTERRUPT)
  CRUTCH.RegisterForCombatEvent("ASPanelCone", onCone, ACTION_RESULT_BEGIN, 95545)
  CRUTCH.RegisterForCombatEvent("ASPanelFart", onFart, ACTION_RESULT_BEGIN, 99819)
  CRUTCH.RegisterForCombatEvent("ASPanelTeleportStrike", onFelmsJump, ACTION_RESULT_BEGIN, 99138)
  CRUTCH.RegisterForEffectChanged("ASPanelEnrage", onEnraged, 101354)
}

AS.UnregisterMiniPanel = function (this: void) {
  CRUTCH.UnregisterForCombatEvent("ASPanelBoltsBegin")
  CRUTCH.UnregisterForCombatEvent("ASPanelBoltsFaded")
  CRUTCH.UnregisterForCombatEvent("ASPanelInterrupted")
  CRUTCH.UnregisterForCombatEvent("ASPanelCone")
  CRUTCH.UnregisterForCombatEvent("ASPanelFart")
  CRUTCH.UnregisterForCombatEvent("ASPanelTeleportStrike")
  CRUTCH.UnregisterForEffectChanged("ASPanelEnrage")

  IP.StopCount(PANEL_LLOTHIS_HEADER_INDEX)
  IP.StopCount(PANEL_LLOTHIS_ENRAGE_INDEX)
  IP.StopCount(PANEL_LLOTHIS_BOLTS_INDEX)
  IP.StopCount(PANEL_LLOTHIS_CONE_INDEX)
  IP.StopCount(PANEL_LLOTHIS_FART_INDEX)
  IP.StopCount(PANEL_DUMMY_INDEX)
  IP.StopCount(PANEL_FELMS_HEADER_INDEX)
  IP.StopCount(PANEL_FELMS_ENRAGE_INDEX)
  IP.StopCount(PANEL_FELMS_TELEPORT_INDEX)

  EVENT_MANAGER.UnregisterForUpdate(`${CRUTCH.name}FelmsJumpCountdown`)

  llothisDisplaying = false
  llothisDormant = false
  felmsDormant = false
}
