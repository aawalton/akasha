import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-constants/combat-alerts-constants.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-info-panel/combat-alerts-info-panel.module.code.ts"
import type {
  DrawingColor,
  DrawingIcon,
  DrawingUpdateFunc,
  SpaceOptions,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-hub/combat-alerts-drawing-hub.module.code.ts"
import {
  type CombatEventCallback,
  CRUTCH,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

const C = CRUTCH.Constants

export const PANEL_ENFEEBLEMENT_INDEX = 7
export const BLAZING_MALEDICTION_ID = 234284
export const SPARKING_MALEDICTION_ID = 234011

let shouldTargetJynorah: boolean | undefined

export const onMaledictionGainedSelf: CombatEventCallback = function (
  this: void,
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
  _targetUnitId,
  abilityId
) {
  shouldTargetJynorah = abilityId === SPARKING_MALEDICTION_ID
  CRUTCH.dbgOther("initialized shouldTargetJynorah " + tostring(shouldTargetJynorah))
  CRUTCH.UnregisterForCombatEvent("SparkingMaledictionInfoPanelSelf")
  CRUTCH.UnregisterForCombatEvent("BlazingMaledictionInfoPanelSelf")
}

function onMaledictionTimeout(this: void): undefined {
  EVENT_MANAGER.UnregisterForUpdate(CRUTCH.name + "MaledictionTimeout")

  zo_callLater(() => {
    if (!CRUTCH.groupInCombat) return
    if (shouldTargetJynorah === undefined) {
      CRUTCH.dbgOther("|cFF0000shouldTargetJynorah nil")
      return
    }

    shouldTargetJynorah = !shouldTargetJynorah
    CRUTCH.dbgOther("flipped shouldTargetJynorah: " + tostring(shouldTargetJynorah))

    if (shouldTargetJynorah) {
      CRUTCH.InfoPanel.SetLine(
        PANEL_ENFEEBLEMENT_INDEX,
        "|c8ef5f5Target Jynorah / blue portal|r",
        0.8
      )
    } else {
      CRUTCH.InfoPanel.SetLine(
        PANEL_ENFEEBLEMENT_INDEX,
        "|cff6600Target Skorkhif / orange portal|r",
        0.8
      )
    }
  }, 4500)
}

export function onMaledictionGained(this: void): undefined {
  EVENT_MANAGER.RegisterForUpdate(CRUTCH.name + "MaledictionTimeout", 500, onMaledictionTimeout)
}

const SPARKING: Record<string, number> = {}
const BLAZING: Record<string, number> = {}
const ENFEEBLEMENT_UNIQUE_NAME = "CrutchAlertsOCEnfeeblement"

export function resetCurses(this: void): undefined {
  ZO_ClearTable(SPARKING)
  ZO_ClearTable(BLAZING)

  shouldTargetJynorah = undefined
}

function doubleCurseIconCallback(this: void, icon: DrawingIcon, atName: string): undefined {
  const sparking = SPARKING[atName]
  const blazing = BLAZING[atName]
  if (sparking !== undefined && blazing !== undefined) {
    const doubleCursedDuration = math.min(sparking, blazing) - GetGameTimeMilliseconds()
    const setText = icon.SetText
    if (setText !== undefined) {
      setText(icon, tostring(math.max(0, math.ceil(doubleCursedDuration / 1000))))
    }
  }
}

function updateEnfeeblementIcon(this: void, atName: string, unitTag: string): undefined {
  CRUTCH.RemoveAttachedIconForUnit(unitTag, ENFEEBLEMENT_UNIQUE_NAME)

  let icon: string
  let color: DrawingColor
  let callback: DrawingUpdateFunc | undefined
  let spaceOptions: SpaceOptions | undefined
  if (SPARKING[atName] !== undefined && BLAZING[atName] !== undefined) {
    icon = "/esoui/art/ava/ava_rankicon64_grandoverlord.dds"
    color = C.CURSEPURPLE
    callback = (drawn) => {
      doubleCurseIconCallback(drawn, atName)
    }
    spaceOptions = {
      label: {
        text: "!",
        size: 30,
        color: C.CURSEPURPLE,
      },
      texture: {
        path: "/esoui/art/ava/ava_rankicon64_grandoverlord.dds",
        size: 0.8,
        color: C.CURSEPURPLE,
      },
    }
  } else if (SPARKING[atName] !== undefined) {
    icon = "/esoui/art/ava/ava_rankicon64_tribune.dds"
    color = [0, 4 / 255, 1]
  } else if (BLAZING[atName] !== undefined) {
    icon = "/esoui/art/ava/ava_rankicon64_prefect.dds"
    color = [1, 113 / 255, 0]
  } else {
    CRUTCH.dbgSpam("Removed icon for " + atName)
    return
  }

  CRUTCH.dbgSpam(string.format("Setting |t100%%:100%%:%s|t for %s", icon, atName))
  CRUTCH.SetAttachedIconForUnit(
    unitTag,
    ENFEEBLEMENT_UNIQUE_NAME,
    C.PRIORITY.MECHANIC_1_PRIORITY,
    icon,
    100,
    color,
    false,
    callback,
    spaceOptions
  )
}

let areIconsEnabled: boolean | undefined

export function refreshAllEnfeeblementIcons(this: void): undefined {
  if (areIconsEnabled !== true) return
  CRUTCH.dbgOther("|cFF0000REFRESHING ALL ENFEEBLEMENT ICONS!")
  CRUTCH.RemoveAllAttachedIcons(ENFEEBLEMENT_UNIQUE_NAME)
  for (const i of $range(1, GetGroupSize())) {
    const unitTag = GetGroupUnitTagByIndex(i)
    if (unitTag !== undefined && DoesUnitExist(unitTag)) {
      const atName = GetUnitDisplayName(unitTag)
      updateEnfeeblementIcon(atName, unitTag)
    }
  }
}

function onEnfeeblement(
  this: void,
  enfeeblementStruct: Record<string, number>,
  changeType: number,
  unitTag: string,
  durationMs: number
): undefined {
  const atName = GetUnitDisplayName(unitTag)
  if (changeType === EFFECT_RESULT_GAINED) {
    enfeeblementStruct[atName] = GetGameTimeMilliseconds() + durationMs
    updateEnfeeblementIcon(atName, unitTag)
  } else if (changeType === EFFECT_RESULT_UPDATED) {
    enfeeblementStruct[atName] = GetGameTimeMilliseconds() + durationMs
  } else if (changeType === EFFECT_RESULT_FADED) {
    delete enfeeblementStruct[atName]
    updateEnfeeblementIcon(atName, unitTag)
  }
}

export function unregisterEnfeeblement(this: void): undefined {
  CRUTCH.dbgSpam("Unregistering Enfeeblement")
  CRUTCH.UnregisterForEffectChanged("SparkingEnfeeblement")
  CRUTCH.UnregisterForEffectChanged("BlazingEnfeeblement")
  areIconsEnabled = false
}

export function registerEnfeeblement(this: void): undefined {
  unregisterEnfeeblement()

  CRUTCH.dbgSpam("Registering Enfeeblement")
  CRUTCH.RegisterForEffectChanged(
    "SparkingEnfeeblement",
    (_eventCode, changeType, _effectSlot, _effectName, unitTag, beginTime, endTime) => {
      onEnfeeblement(SPARKING, changeType, unitTag, (endTime - beginTime) * 1000)
    },
    233644,
    "group"
  )

  CRUTCH.RegisterForEffectChanged(
    "BlazingEnfeeblement",
    (_eventCode, changeType, _effectSlot, _effectName, unitTag, beginTime, endTime) => {
      onEnfeeblement(BLAZING, changeType, unitTag, (endTime - beginTime) * 1000)
    },
    233692,
    "group"
  )

  areIconsEnabled = true
}
