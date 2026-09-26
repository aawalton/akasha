import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-info-panel/combat-alerts-info-panel.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-info-panel-utils/combat-alerts-info-panel-utils.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import { crutchString } from "akasha/temper/addon/pages/combat/modules/combat-alerts-lang/combat-alerts-lang.module.code.ts"

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchDreadsailReef {
    RegisterReefGuardian: (this: void) => void
    UnregisterReefGuardian: (this: void) => void
  }
}

const DSR = CRUTCH.DreadsailReef

const PANEL_REEF_INDEX_OFFSET = 10
const REEF_SCALE = 0.7

const HEARTBURN_ID = 170481

const REEF_INDICES = ["big", "med1", "small1", "small2", "med2"]

function getReefPrefix(this: void, index: number): string {
  return string.format("#%d (%s)", index, REEF_INDICES[index - 1])
}

function setReefLine(this: void, index: number, suffix: string, alpha?: number): undefined {
  CRUTCH.InfoPanel.SetLine(
    PANEL_REEF_INDEX_OFFSET + index,
    getReefPrefix(index) + suffix,
    REEF_SCALE,
    alpha
  )
}

const BOSS_UNIT_IDS: Record<number, string> = {}
const LAST_HEARTBURNS: Record<number, number> = {}

function onReefStart(this: void): undefined {
  setReefLine(1, "")
  for (let i = 2; i <= 5; i++) {
    setReefLine(i, "", 0.5)
  }
}

function onReefHealth(
  this: void,
  _eventCode: number,
  unitTag: string,
  _powerIndex: number,
  _powerType: number,
  powerValue: number,
  powerMax: number
): undefined {
  const bossIndex = tonumber(unitTag.substring(4, 5)) as number
  if (powerValue === 0) {
    CRUTCH.InfoPanel.StopCount(PANEL_REEF_INDEX_OFFSET + bossIndex)
    setReefLine(bossIndex, " - |t100%:100%:esoui/art/icons/mapkey/mapkey_groupboss.dds|t", 0.7)
    return
  }

  if (bossIndex === 1) {
    return
  }

  const percent = (powerValue / powerMax) * 100
  if (percent >= 81) {
    const remaining = math.floor((percent - 81) * 10) / 10
    setReefLine(
      bossIndex,
      zo_strformat(" - can run in <<1>><<2>>%", remaining === 0 ? "|cFF8C00" : "", remaining)
    )
  } else if (LAST_HEARTBURNS[bossIndex] === undefined) {
    setReefLine(bossIndex, " - can run in |cFF8C000%")
  }
}

function onHeartburnGained(
  this: void,
  _eventCode: number,
  _result: number,
  _isError: boolean,
  _abilityName: string,
  _abilityGraphic: number,
  _abilityActionSlotType: number,
  _sourceName: string,
  _sourceType: number,
  _targetName: string,
  _targetType: number,
  hitValue: number,
  _powerType: number,
  _damageType: number,
  _log: boolean,
  _sourceUnitId: number,
  targetUnitId: number
): undefined {
  const bossTag = BOSS_UNIT_IDS[targetUnitId]
  if (bossTag === undefined) {
    CRUTCH.dbgOther(`|cFF0000Unable to find boss tag for ${targetUnitId}`)
    return
  }
  const bossIndex = tonumber(bossTag.substring(4, 5)) as number

  CRUTCH.dbgOther(`${bossIndex} heartburn gained`)
  CRUTCH.InfoPanel.CountDownDuration(
    PANEL_REEF_INDEX_OFFSET + bossIndex,
    `${getReefPrefix(bossIndex)} - `,
    hitValue,
    REEF_SCALE
  )
  LAST_HEARTBURNS[bossIndex] = GetGameTimeMilliseconds()
}

function onHeartburnFaded(
  this: void,
  _eventCode: number,
  _result: number,
  _isError: boolean,
  _abilityName: string,
  _abilityGraphic: number,
  _abilityActionSlotType: number,
  _sourceName: string,
  _sourceType: number,
  _targetName: string,
  _targetType: number,
  _hitValue: number,
  _powerType: number,
  _damageType: number,
  _log: boolean,
  _sourceUnitId: number,
  targetUnitId: number
): undefined {
  const bossTag = BOSS_UNIT_IDS[targetUnitId]
  if (bossTag === undefined) {
    CRUTCH.dbgOther(`|cFF0000Unable to find boss tag for ${targetUnitId}`)
    return
  }
  const bossIndex = tonumber(bossTag.substring(4, 5)) as number

  CRUTCH.dbgOther(`${bossIndex} heartburn faded`)
  CRUTCH.InfoPanel.StopCount(PANEL_REEF_INDEX_OFFSET + bossIndex)
  const lastTime = LAST_HEARTBURNS[bossIndex]
  if (lastTime === undefined) {
    return
  }
  CRUTCH.InfoPanel.CountDownToTargetTime(
    PANEL_REEF_INDEX_OFFSET + bossIndex,
    `${getReefPrefix(bossIndex)} - can run in `,
    lastTime + 57400,
    REEF_SCALE
  )
}

function onBossEffect(
  this: void,
  _eventCode: number,
  _changeType: number,
  _effectSlot: number,
  _effectName: string,
  unitTag: string,
  _beginTime: number,
  _endTime: number,
  _stackCount: number,
  _iconName: string,
  _buffType: string,
  _effectType: number,
  _abilityType: number,
  _statusEffectType: number,
  _unitName: string,
  unitId: number
): undefined {
  BOSS_UNIT_IDS[unitId] = unitTag
}

let reefRegistered = false

function maybeRegisterReef(this: void): undefined {
  if (reefRegistered) {
    return
  }

  if (
    GetUnitName("boss1") === CRUTCH.GetCapitalizedString(crutchString("CRUTCH_BHB_REEF_GUARDIAN"))
  ) {
    CRUTCH.dbgOther(`Registering reef info panel: ${tostring(GetUnitName("boss1"))}`)
    reefRegistered = true

    EVENT_MANAGER.RegisterForEvent(`${CRUTCH.name}DSRReefHealth`, EVENT_POWER_UPDATE, onReefHealth)
    EVENT_MANAGER.AddFilterForEvent(
      `${CRUTCH.name}DSRReefHealth`,
      EVENT_POWER_UPDATE,
      REGISTER_FILTER_UNIT_TAG_PREFIX,
      "boss"
    )
    EVENT_MANAGER.AddFilterForEvent(
      `${CRUTCH.name}DSRReefHealth`,
      EVENT_POWER_UPDATE,
      REGISTER_FILTER_POWER_TYPE,
      COMBAT_MECHANIC_FLAGS_HEALTH
    )

    CRUTCH.RegisterForEffectChanged("DSRReefBossEffect", onBossEffect, undefined, "boss")
    CRUTCH.RegisterForCombatEvent(
      "DSRReefHeartburnGained",
      onHeartburnGained,
      ACTION_RESULT_EFFECT_GAINED_DURATION,
      HEARTBURN_ID
    )
    CRUTCH.RegisterForCombatEvent(
      "DSRReefHeartburnFaded",
      onHeartburnFaded,
      ACTION_RESULT_EFFECT_FADED,
      HEARTBURN_ID
    )

    onReefStart()
  }
}

function unregisterReef(this: void): undefined {
  CRUTCH.dbgOther("Unregistering reef info panel")
  reefRegistered = false
  EVENT_MANAGER.UnregisterForEvent(`${CRUTCH.name}DSRReefHealth`, EVENT_POWER_UPDATE)
  CRUTCH.UnregisterForEffectChanged("DSRReefBossEffect")
  CRUTCH.UnregisterForCombatEvent("DSRReefHeartburnGained")
  CRUTCH.UnregisterForCombatEvent("DSRReefHeartburnFaded")
}

function cleanUp(this: void): undefined {
  unregisterReef()

  for (let i = 1; i <= 5; i++) {
    CRUTCH.InfoPanel.StopCount(PANEL_REEF_INDEX_OFFSET + i)
  }
  ZO_ClearTable(BOSS_UNIT_IDS)
  ZO_ClearTable(LAST_HEARTBURNS)
}

DSR.RegisterReefGuardian = function (this: void) {
  CRUTCH.RegisterBossChangedListener(
    "CrutchDreadsailReefReefGuardianBossesChanged",
    maybeRegisterReef
  )
  CRUTCH.RegisterEnteredGroupCombatListener(
    "CrutchDreadsailReefGuardianEnteredCombat",
    maybeRegisterReef
  )
  CRUTCH.RegisterExitedGroupCombatListener("CrutchDreadsailReefGuardianExitedCombat", cleanUp)

  maybeRegisterReef()
}

DSR.UnregisterReefGuardian = function (this: void) {
  cleanUp()
  CRUTCH.UnregisterBossChangedListener("CrutchDreadsailReefReefGuardianBossesChanged")
  CRUTCH.UnregisterEnteredGroupCombatListener("CrutchDreadsailReefGuardianEnteredCombat")
  CRUTCH.UnregisterExitedGroupCombatListener("CrutchDreadsailReefGuardianExitedCombat")
}
