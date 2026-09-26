import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-info-panel-utils/combat-alerts-info-panel-utils.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import {
  BLAZING_MALEDICTION_ID,
  onMaledictionGained,
  onMaledictionGainedSelf,
  PANEL_ENFEEBLEMENT_INDEX,
  refreshAllEnfeeblementIcons,
  registerEnfeeblement,
  resetCurses,
  SPARKING_MALEDICTION_ID,
  unregisterEnfeeblement,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-ossein-twins-curses/combat-alerts-ossein-twins-curses.module.code.ts"
import {
  BOSS_HEALTHS,
  isBaseVet,
  isHM,
  onTwinsHealth,
  unspoofAllIcons,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-ossein-twins-health/combat-alerts-ossein-twins-health.module.code.ts"
import {
  onCombatStart,
  PANEL_CLASH_INDEX,
  PANEL_LEAP_INDEX,
  registerHardmodeAtros,
  resetClashes,
  unregisterHardmodeAtros,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-ossein-twins-panel/combat-alerts-ossein-twins-panel.module.code.ts"
import {
  DAMAGE_TYPES,
  registerTwins,
  TITAN_IDS,
  TITAN_MAX_HPS,
  unregisterTwins,
  unspoofTitans,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-ossein-twins-titans/combat-alerts-ossein-twins-titans.module.code.ts"

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchOsseinCage {
    IsJynorah: (this: void) => boolean
    CleanUp: (this: void) => void
    RegisterOCZoneTwins: (this: void) => void
    UnregisterOCZoneTwins: (this: void) => void
  }
}

const OC = CRUTCH.OsseinCage

function isJynorah(this: void): boolean {
  const [, powerMax] = GetUnitPower("boss1", COMBAT_MECHANIC_FLAGS_HEALTH)
  return TITAN_MAX_HPS[powerMax] !== undefined
}
OC.IsJynorah = isJynorah

function registerReflectiveScales(this: void, damageResult: number, str: string): undefined {
  CRUTCH.RegisterForCombatEvent(
    "OCTitanReflect" + tostring(damageResult),
    (
      _eventCode,
      _result,
      _isError,
      _abilityName,
      _abilityGraphic,
      _abilityActionSlotType,
      _sourceName,
      sourceType,
      _targetName,
      _targetType,
      _hitValue,
      _powerType,
      _damageType,
      _log,
      _sourceUnitId,
      targetUnitId,
      abilityId
    ) => {
      const titanName = TITAN_IDS[targetUnitId]
      if (sourceType === COMBAT_UNIT_TYPE_PLAYER && titanName !== undefined) {
        CRUTCH.msg(
          string.format("You hit %s with |cFF00FF%s|r%s", titanName, GetAbilityName(abilityId), str)
        )
      }
    },
    damageResult,
    undefined,
    undefined,
    COMBAT_UNIT_TYPE_NONE
  )
}

function maybeRegisterTwins(this: void): undefined {
  if (isJynorah()) {
    registerTwins()
  } else {
    unregisterTwins()
  }

  if (isHM()) {
    registerHardmodeAtros()
  } else {
    unregisterHardmodeAtros()
  }

  if (isHM() && CRUTCH.savedOptions.osseincage.enableAbilityOverlay) {
    CRUTCH.dbgOther("registering twins health")
    EVENT_MANAGER.RegisterForEvent(CRUTCH.name + "OCTwinsHealth", EVENT_POWER_UPDATE, onTwinsHealth)
    EVENT_MANAGER.AddFilterForEvent(
      CRUTCH.name + "OCTwinsHealth",
      EVENT_POWER_UPDATE,
      REGISTER_FILTER_UNIT_TAG_PREFIX,
      "boss"
    )
    EVENT_MANAGER.AddFilterForEvent(
      CRUTCH.name + "OCTwinsHealth",
      EVENT_POWER_UPDATE,
      REGISTER_FILTER_POWER_TYPE,
      COMBAT_MECHANIC_FLAGS_HEALTH
    )
  } else {
    CRUTCH.dbgOther("unregistering twins health")
    EVENT_MANAGER.UnregisterForEvent(CRUTCH.name + "OCTwinsHealth", EVENT_POWER_UPDATE)
  }

  const enfeeblementOption = CRUTCH.savedOptions.osseincage.showEnfeeblementIcons
  if (enfeeblementOption === "NEVER") {
    unregisterEnfeeblement()
    return
  } else if (enfeeblementOption === "ALWAYS") {
    registerEnfeeblement()
  } else if (enfeeblementOption === "HM" && isHM()) {
    registerEnfeeblement()
  } else if (enfeeblementOption === "VET" && (isHM() || isBaseVet())) {
    registerEnfeeblement()
  } else {
    unregisterEnfeeblement()
  }

  if (
    CRUTCH.savedOptions.osseincage.panel.showTarget &&
    isHM() &&
    GetSelectedLFGRole() !== LFG_ROLE_TANK
  ) {
    CRUTCH.RegisterForCombatEvent(
      "SparkingMaledictionInfoPanel",
      onMaledictionGained,
      ACTION_RESULT_EFFECT_GAINED,
      SPARKING_MALEDICTION_ID
    )
    CRUTCH.RegisterForCombatEvent(
      "SparkingMaledictionInfoPanelSelf",
      onMaledictionGainedSelf,
      ACTION_RESULT_EFFECT_GAINED,
      SPARKING_MALEDICTION_ID,
      undefined,
      COMBAT_UNIT_TYPE_PLAYER
    )
    CRUTCH.RegisterForCombatEvent(
      "BlazingMaledictionInfoPanel",
      onMaledictionGained,
      ACTION_RESULT_EFFECT_GAINED,
      BLAZING_MALEDICTION_ID
    )
    CRUTCH.RegisterForCombatEvent(
      "BlazingMaledictionInfoPanelSelf",
      onMaledictionGainedSelf,
      ACTION_RESULT_EFFECT_GAINED,
      BLAZING_MALEDICTION_ID,
      undefined,
      COMBAT_UNIT_TYPE_PLAYER
    )
  } else {
    CRUTCH.UnregisterForCombatEvent("SparkingMaledictionInfoPanel")
    CRUTCH.UnregisterForCombatEvent("SparkingMaledictionInfoPanelSelf")
    CRUTCH.UnregisterForCombatEvent("BlazingMaledictionInfoPanel")
    CRUTCH.UnregisterForCombatEvent("BlazingMaledictionInfoPanelSelf")
  }

  for (const [damageResult, str] of pairs(DAMAGE_TYPES)) {
    if (isHM() && CRUTCH.savedOptions.osseincage.printHMReflectiveScales) {
      registerReflectiveScales(damageResult, str)
    } else {
      CRUTCH.UnregisterForCombatEvent("OCTitanReflect" + tostring(damageResult))
    }
  }
}

function cleanUp(this: void): undefined {
  CRUTCH.InfoPanel.StopCount(PANEL_LEAP_INDEX)
  CRUTCH.InfoPanel.StopCount(PANEL_CLASH_INDEX)
  resetClashes()
  ZO_ClearTable(BOSS_HEALTHS)
  unspoofAllIcons()

  unspoofTitans()
  resetCurses()

  CRUTCH.InfoPanel.StopCount(PANEL_ENFEEBLEMENT_INDEX)
}
OC.CleanUp = cleanUp

OC.RegisterOCZoneTwins = function (this: void) {
  CRUTCH.RegisterEnteredGroupCombatListener("CrutchOsseinCageJynorahEnteredCombat", onCombatStart)
  CRUTCH.RegisterExitedGroupCombatListener("CrutchOsseinCageJynorahExitedCombat", cleanUp)

  CRUTCH.RegisterBossChangedListener("CrutchOsseinCage", () => {
    zo_callLater(maybeRegisterTwins, 3000)
  })
  maybeRegisterTwins()

  let prevMaxHealth = 0
  EVENT_MANAGER.RegisterForEvent(
    CRUTCH.name + "OCHealthUpdate",
    EVENT_POWER_UPDATE,
    (
      _eventCode: number,
      _unitTag: string,
      _powerIndex: number,
      _powerType: number,
      _powerValue: number,
      powerMax: number
    ) => {
      if (prevMaxHealth === powerMax) return
      prevMaxHealth = powerMax
      CRUTCH.dbgSpam("max hp changed")
      maybeRegisterTwins()
    }
  )
  EVENT_MANAGER.AddFilterForEvent(
    CRUTCH.name + "OCHealthUpdate",
    EVENT_POWER_UPDATE,
    REGISTER_FILTER_UNIT_TAG_PREFIX,
    "boss1"
  )
  EVENT_MANAGER.AddFilterForEvent(
    CRUTCH.name + "OCHealthUpdate",
    EVENT_POWER_UPDATE,
    REGISTER_FILTER_POWER_TYPE,
    COMBAT_MECHANIC_FLAGS_HEALTH
  )

  CRUTCH.RegisterUnitTagListener("CrutchAlertsOCEnfeeblementRefresh", refreshAllEnfeeblementIcons)
}

OC.UnregisterOCZoneTwins = function (this: void) {
  CRUTCH.UnregisterEnteredGroupCombatListener("CrutchOsseinCageJynorahEnteredCombat")
  CRUTCH.UnregisterExitedGroupCombatListener("CrutchOsseinCageJynorahExitedCombat")

  CRUTCH.UnregisterBossChangedListener("CrutchOsseinCage")

  EVENT_MANAGER.UnregisterForEvent(CRUTCH.name + "OCHealthUpdate", EVENT_POWER_UPDATE)

  CRUTCH.UnregisterUnitTagListener("CrutchAlertsOCEnfeeblementRefresh")

  maybeRegisterTwins()
}
