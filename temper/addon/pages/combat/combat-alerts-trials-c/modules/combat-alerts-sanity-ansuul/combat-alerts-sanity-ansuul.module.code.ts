import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-constants/combat-alerts-constants.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-hub/combat-alerts-drawing-hub.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-boss-api/combat-alerts-boss-api.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-info-panel-utils/combat-alerts-info-panel-utils.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

const C = CRUTCH.Constants

interface BreakdownOptions {
  name: string
  unitTag: string
  fgColor: number[]
  bgColor: number[]
}

export const BREAKDOWN_DATA: Record<number, BreakdownOptions> = {
  [188766]: {
    name: "Red",
    unitTag: "boss2",
    fgColor: C.FELMS_FG,
    bgColor: C.FELMS_BG,
  },
  [188768]: {
    name: "Blue",
    unitTag: "boss3",
    fgColor: [7 / 255, 87 / 255, 179 / 255],
    bgColor: [1 / 255, 11 / 255, 23 / 255],
  },
  [188769]: {
    name: "Green",
    unitTag: "boss4",
    fgColor: C.LLOTHIS_FG,
    bgColor: C.LLOTHIS_BG,
  },
}

const ANSUUL_TO_CLONE_HP: Record<number, number> = {
  [40899072]: 1136086,
  [69858576]: 3881032,
  [160674720]: 8926374,
}

const TRACKED_UNITS: Record<number, boolean> = {}

export function onBreakdownSplits(
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
  targetUnitId: number,
  abilityId: number
): undefined {
  const options = BREAKDOWN_DATA[abilityId] as BreakdownOptions
  TRACKED_UNITS[targetUnitId] = true
  const [, powerMax] = GetUnitPower("boss1", COMBAT_MECHANIC_FLAGS_HEALTH)
  const maxHealth = ANSUUL_TO_CLONE_HP[powerMax] as number
  CRUTCH.TrackUnitForSpoofing(
    targetUnitId,
    options.name,
    options.unitTag,
    maxHealth,
    options.fgColor,
    options.bgColor
  )
}

export function untrackAll(this: void): undefined {
  for (const [unitId] of pairs(TRACKED_UNITS)) {
    CRUTCH.UntrackUnitForSpoofing(unitId)
    delete TRACKED_UNITS[unitId]
  }
}

export const PANEL_WRATHSTORM_INDEX = 6
export const WRATHSTORM_ID = 198759
const wrathstormPrefix = zo_strformat("|cCC0000<<C:1>>: ", GetAbilityName(WRATHSTORM_ID))

export function onWrathstorm(this: void): undefined {
  CRUTCH.InfoPanel.CountDownDuration(PANEL_WRATHSTORM_INDEX, wrathstormPrefix, 23900)
}

export function onRitual(this: void): undefined {
  CRUTCH.InfoPanel.StopCount(PANEL_WRATHSTORM_INDEX)
}

export function onBreakdownFaded(this: void): undefined {
  if (!CRUTCH.groupInCombat) {
    CRUTCH.dbgOther("|cFF0000Skipping Wrathstorm timer because end of combat")
    return
  }
  CRUTCH.InfoPanel.CountDownDuration(PANEL_WRATHSTORM_INDEX, wrathstormPrefix, 23600)
}

export const PANEL_CALAMITY_INDEX = 7
export const CALAMITY_ID = 186728
const calamityPrefix = zo_strformat("|c8ef5f5<<C:1>>: ", GetAbilityName(CALAMITY_ID))

export function onCalamity(this: void): undefined {
  CRUTCH.InfoPanel.CountDownDuration(PANEL_CALAMITY_INDEX, calamityPrefix, 22500)
}

export function onCalamityRitual(this: void): undefined {
  CRUTCH.InfoPanel.CountDownDuration(PANEL_CALAMITY_INDEX, calamityPrefix, 37000)
}

export const ATTUNEMENT_ID = 242224
export const UNATTUNED_ID = 189027
const ATTUNED: Record<string, boolean> = {}

export function onAttunement(
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
  const unitTag = CRUTCH.groupIdToTag[targetUnitId]
  if (unitTag === undefined) {
    return
  }

  CRUTCH.dbgOther(zo_strformat("attunement gained: <<1>>", GetUnitDisplayName(unitTag)))
  ATTUNED[unitTag] = true
}

export function onUnattuned(this: void): undefined {
  CRUTCH.dbgOther("unattuning")
  ZO_ClearTable(ATTUNED)
}

export function clearAttuned(this: void): undefined {
  ZO_ClearTable(ATTUNED)
}

CRUTCH.IsInVantonPortal = function (this: void, unitTag) {
  if (ATTUNED[unitTag] === true) {
    CRUTCH.dbgSpam(zo_strformat("<<1>> is in portal", unitTag))
  } else {
    CRUTCH.dbgSpam(zo_strformat("<<1>> is not in portal", unitTag))
  }
  return ATTUNED[unitTag] === true
}

export const POISONED_MIND_UNIQUE_NAME = "CrutchAlertsSEPoisonedMind"

export function onPoisonedMind(
  this: void,
  _eventCode: number,
  changeType: number,
  _effectSlot: number,
  _effectName: string,
  unitTag: string
): undefined {
  if (changeType === EFFECT_RESULT_GAINED) {
    CRUTCH.SetAttachedIconForUnit(
      unitTag,
      POISONED_MIND_UNIQUE_NAME,
      C.PRIORITY.MECHANIC_1_PRIORITY,
      "/esoui/art/icons/visions/vision_utility_viciouspoisons.dds",
      CRUTCH.savedOptions.sanitysedge.poisonedMindIconsSize
    )
  } else if (changeType === EFFECT_RESULT_FADED) {
    CRUTCH.RemoveAttachedIconForUnit(unitTag, POISONED_MIND_UNIQUE_NAME)
  }
}
