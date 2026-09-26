import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-placed/combat-alerts-drawing-placed.module.code.ts"
import {
  type CombatEventCallback,
  CRUTCH,
  type EffectChangedCallback,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import { registerZone } from "akasha/temper/addon/pages/combat/modules/combat-alerts-zones/combat-alerts-zones.module.code.ts"

CRUTCH.majorCowardiceUnitIds = {}

const onMajorCowardice: EffectChangedCallback = function (
  this: void,
  _eventCode,
  changeType,
  _effectSlot,
  _effectName,
  _unitTag,
  _beginTime,
  _endTime,
  _stackCount,
  _iconName,
  _buffType,
  _effectType,
  _abilityType,
  _statusEffectType,
  unitName,
  unitId
) {
  if (changeType === EFFECT_RESULT_GAINED || changeType === EFFECT_RESULT_UPDATED) {
    CRUTCH.majorCowardiceUnitIds[unitId] = true
    CRUTCH.dbgSpam(zo_strformat("|c00FF00<<1>> (<<2>>) got major cowardice|r", unitName, unitId))
  } else if (changeType === EFFECT_RESULT_FADED) {
    delete CRUTCH.majorCowardiceUnitIds[unitId]
  }
}

const AVAILABLE_MARKERS = [
  TARGET_MARKER_TYPE_ONE,
  TARGET_MARKER_TYPE_FIVE,
  TARGET_MARKER_TYPE_TWO,
  TARGET_MARKER_TYPE_SEVEN,
  TARGET_MARKER_TYPE_SIX,
  TARGET_MARKER_TYPE_FOUR,
  TARGET_MARKER_TYPE_THREE,
  TARGET_MARKER_TYPE_EIGHT,
]

let usedMarkers: Record<number, boolean> = {}

function getUnusedMarker(this: void): number {
  for (let i = 1; i <= 8; i++) {
    let index = i
    if (!IsUnitGroupLeader("player")) {
      index = i + 4
    }
    if (index > 8) {
      index = index - 8
    }

    const marker = AVAILABLE_MARKERS[index - 1]
    if (marker !== undefined && usedMarkers[marker] !== true) {
      return marker
    }
  }

  usedMarkers = {}
  return (
    (IsUnitGroupLeader("player") ? AVAILABLE_MARKERS[0] : AVAILABLE_MARKERS[4]) ??
    TARGET_MARKER_TYPE_ONE
  )
}

const NEGATE_CASTERS: Record<string, boolean> = {
  ["silver rose stormcaster"]: true,
  ["dro-m'athra conduit"]: true,
  ["dremora conduit"]: true,
  ["silberrosen-sturmwirker"]: true,
  ["silberrosen-sturmwirkerin"]: true,
  ["dro-m'athra-medium"]: true,
  ["dremora-medium"]: true,
  ["lanzador de tormentas de la rosa plateada"]: true,
  ["lanzadora de tormentas de la rosa plateada"]: true,
  ["conductor dro-m'athra"]: true,
  ["conductora dro-m'athra"]: true,
  ["dremora conductor"]: true,
  ["dremora conductora"]: true,
  ["lance-tempête de la rose d'argent"]: true,
  ["canalisateur dro-m'athra"]: true,
  ["conduit drémora"]: true,
  ["銀の薔薇のストームキャスター"]: true,
  ["ドロ・マスラの伝送者"]: true,
  ["ドレモラ・コンデュイット"]: true,
  ["призыватель бури серебряной розы"]: true,
  ["призывательница бури серебряной розы"]: true,
  ["проводник дро-м’атра"]: true,
  ["дремора-проводник"]: true,
  ["银玫瑰风暴法师"]: true,
  ["堕落虎人导能者"]: true,
  ["魔人导能法师"]: true,
}

function onReticleChanged(this: void): undefined {
  if (
    !DoesUnitExist("reticleover") ||
    IsUnitDead("reticleover") ||
    GetUnitReaction("reticleover") !== UNIT_REACTION_HOSTILE ||
    GetUnitTargetMarkerType("reticleover") !== TARGET_MARKER_TYPE_NONE
  ) {
    return
  }

  if (GetUnitDifficulty("reticleover") === MONSTER_DIFFICULTY_HARD) {
    if (!CRUTCH.savedOptions.endlessArchive.markFabled) {
      return
    }
  } else if (
    NEGATE_CASTERS[string.lower(zo_strformat("<<1>>", GetUnitName("reticleover")))] !== undefined
  ) {
    if (!CRUTCH.savedOptions.endlessArchive.markNegate) {
      return
    }
  } else {
    return
  }

  const marker = getUnusedMarker()

  usedMarkers[marker] = true
  AssignTargetMarkerToReticleTarget(marker)
  CRUTCH.dbgSpam(string.format("Assigned %s to %s", marker, GetUnitName("reticleover")))
}

function onCombatStateChanged(this: void, _eventCode: number, inCombat: boolean): undefined {
  if (!inCombat) {
    usedMarkers = {}
    CRUTCH.dbgSpam("Cleared usedMarkers")
    CRUTCH.majorCowardiceUnitIds = {}
  }
}

const onElixir: CombatEventCallback = function (
  this: void,
  _eventCode,
  _result,
  _isError,
  _abilityName,
  _abilityGraphic,
  _abilityActionSlotType,
  _sourceName,
  _sourceType,
  targetName,
  _targetType,
  _hitValue,
  _powerType,
  _damageType,
  _log,
  _sourceUnitId,
  targetUnitId
) {
  const unitTag = CRUTCH.groupIdToTag[targetUnitId]

  if (unitTag === undefined) {
    CRUTCH.dbgOther(
      zo_strformat("|cFF0000Couldn't find unit tag for <<1>> ID <<2>>", targetName, targetUnitId)
    )
    return
  }

  CRUTCH.dbgSpam(zo_strformat("Elixir on <<1>> (<<2>>)", unitTag, targetName))
  const [, x, y, z] = GetUnitRawWorldPosition(unitTag)
  const key = CRUTCH.Drawing.CreatePlacedIcon(
    "/esoui/art/inventory/inventory_consumables_tabicon_active.dds",
    x,
    y + 50,
    z,
    100,
    [1, 0, 1]
  )
  zo_callLater(function (this: void) {
    CRUTCH.Drawing.RemovePlacedIcon(key)
  }, 16300)
}

const PUZZLE_SOLUTIONS: Record<number, string> = {
  [203317]: "3 1 4 6 5 2 -- left",
  [203319]: "3 1 4 6 5 2 -- left",
  [203321]: "3 1 4 6 5 2 -- left",
  [203323]: "3 1 4 6 5 2 -- left",
  [203325]: "3 1 4 6 5 2 -- left",
  [203327]: "3 1 4 6 5 2 -- left",

  [210720]: "1 6 2 4 5 3 -- right",
  [210722]: "1 6 2 4 5 3 -- right",
  [210724]: "1 6 2 4 5 3 -- right",
  [210726]: "1 6 2 4 5 3 -- right",
  [210728]: "1 6 2 4 5 3 -- right",
  [210730]: "1 6 2 4 5 3 -- right",

  [210778]: "5 1 4 2 3 6",
  [210780]: "5 1 4 2 3 6",
  [210782]: "5 1 4 2 3 6",
  [210784]: "5 1 4 2 3 6",
  [210786]: "5 1 4 2 3 6",
  [210788]: "5 1 4 2 3 6",

  [210739]: "2 5 1 4 3",
  [210741]: "2 5 1 4 3",
  [210743]: "2 5 1 4 3",
  [210745]: "2 5 1 4 3",
  [210747]: "2 5 1 4 3",
  [210749]: "2 5 1 4 3",

  [192440]: "5 3 4 1 2 6 -- right, right",
  [197209]: "5 3 4 1 2 6 -- right, right",
  [197216]: "5 3 4 1 2 6 -- right, right",
  [197219]: "5 3 4 1 2 6 -- right, right",
  [197222]: "5 3 4 1 2 6 -- right, right",
  [197226]: "5 3 4 1 2 6 -- right, right",

  [210759]: "5 2 6 4 3 1 -- left, right",
  [210761]: "5 2 6 4 3 1 -- left, right",
  [210763]: "5 2 6 4 3 1 -- left, right",
  [210765]: "5 2 6 4 3 1 -- left, right",
  [210767]: "5 2 6 4 3 1 -- left, right",
  [210769]: "5 2 6 4 3 1 -- left, right",

  [210798]: "1 5 4 2 3 6 -- left",
  [210800]: "1 5 4 2 3 6 -- left",
  [210802]: "1 5 4 2 3 6 -- left",
  [210804]: "1 5 4 2 3 6 -- left",
  [210806]: "1 5 4 2 3 6 -- left",
  [210808]: "1 5 4 2 3 6 -- left",

  [210702]: "3 5 1 4 2 6 -- left",
  [210704]: "3 5 1 4 2 6 -- left",
  [210706]: "3 5 1 4 2 6 -- left",
  [210708]: "3 5 1 4 2 6 -- left",
  [210710]: "3 5 1 4 2 6 -- left",
  [210712]: "3 5 1 4 2 6 -- left",
}

const onPuzzleSolution: CombatEventCallback = function (
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
  const solution = PUZZLE_SOLUTIONS[abilityId]
  if (solution !== undefined) {
    CRUTCH.msg(solution)
    CRUTCH.UnregisterForCombatEvent("Puzzle")
  }
}

function registerEndlessArchive(this: void): undefined {
  usedMarkers = {}

  EVENT_MANAGER.RegisterForEvent(
    CRUTCH.name + "EACombatState",
    EVENT_PLAYER_COMBAT_STATE,
    onCombatStateChanged
  )

  CRUTCH.RegisterForEffectChanged("IAMajorCowardice", onMajorCowardice, 147643)

  const options = CRUTCH.savedOptions.endlessArchive
  if (options.markFabled || options.markNegate) {
    EVENT_MANAGER.RegisterForEvent(
      CRUTCH.name + "EAReticle",
      EVENT_RETICLE_TARGET_CHANGED,
      onReticleChanged
    )
  }

  if (options.potionIcon) {
    CRUTCH.RegisterForCombatEvent("IAElixir", onElixir, ACTION_RESULT_EFFECT_GAINED, 221794)
  }

  if (options.printPuzzleSolution) {
    CRUTCH.RegisterForCombatEvent("Puzzle", onPuzzleSolution, ACTION_RESULT_EFFECT_GAINED_DURATION)
  }

  CRUTCH.dbgOther("|c88FFFF[CT]|r Registered Endless Archive")
}

function unregisterEndlessArchive(this: void): undefined {
  EVENT_MANAGER.UnregisterForEvent(CRUTCH.name + "EACombatState", EVENT_PLAYER_COMBAT_STATE)
  CRUTCH.UnregisterForEffectChanged("IAMajorCowardice")
  EVENT_MANAGER.UnregisterForEvent(CRUTCH.name + "EAReticle", EVENT_RETICLE_TARGET_CHANGED)
  CRUTCH.UnregisterForCombatEvent("IAElixir")
  CRUTCH.UnregisterForCombatEvent("Puzzle")

  CRUTCH.dbgOther("|c88FFFF[CT]|r Unregistered Endless Archive")
}

registerZone(1436, registerEndlessArchive, unregisterEndlessArchive)
