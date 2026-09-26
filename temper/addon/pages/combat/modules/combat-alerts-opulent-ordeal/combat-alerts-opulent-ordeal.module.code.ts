import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-constants/combat-alerts-constants.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-info-panel/combat-alerts-info-panel.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-info-panel-utils/combat-alerts-info-panel-utils.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-hub/combat-alerts-drawing-hub.module.code.ts"
import {
  type CombatEventCallback,
  CRUTCH,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import { crutchString } from "akasha/temper/addon/pages/combat/modules/combat-alerts-lang/combat-alerts-lang.module.code.ts"
import { registerZone } from "akasha/temper/addon/pages/combat/modules/combat-alerts-zones/combat-alerts-zones.module.code.ts"

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchHub {
    RegisterOpulentOrdeal: (this: void) => void
    UnregisterOpulentOrdeal: (this: void, isSameZone: boolean) => void
  }
}

const C = CRUTCH.Constants

const PANEL_ESSENCE_INDEX = 5
const PANEL_FULL_TEXT_INDEX = 6
const PANEL_ORDER_INDEX = 7

interface BossEssence {
  stunnedId: number
  displayId: number
  color: string
}

const BOSS_ESSENCES: Record<number, BossEssence> = {
  [256159]: {
    stunnedId: 257928,
    displayId: 256088,
    color: "ff0000",
  },
  [256413]: {
    stunnedId: 257929,
    displayId: 256447,
    color: "ff8000",
  },
  [256495]: {
    stunnedId: 257930,
    displayId: 256518,
    color: "cc33ff",
  },
}

const onSummonEssence: CombatEventCallback = function (
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
  const data = BOSS_ESSENCES[abilityId] as BossEssence
  CRUTCH.InfoPanel.CountDownDuration(
    PANEL_ESSENCE_INDEX,
    zo_strformat("|c<<1>><<C:2>>: ", data.color, GetAbilityName(data.displayId)),
    243000
  )
}

function onEssenceDone(this: void): undefined {
  CRUTCH.InfoPanel.StopCount(PANEL_ESSENCE_INDEX)
  CRUTCH.InfoPanel.StopCount(PANEL_FULL_TEXT_INDEX)
  CRUTCH.InfoPanel.StopCount(PANEL_ORDER_INDEX)
}

const AFFINITY_UNIQUE_NAME = "CrutchAlertsOOAffinity"

interface Affinity {
  texture: string
  color: readonly number[]
}

const AFFINITIES: Record<number, Affinity> = {
  [256682]: {
    texture: "/esoui/art/buttons/gamepad/ps5/nav_ps5_square.dds",
    color: C.PURPLE,
  },
  [256680]: {
    texture: "/esoui/art/buttons/gamepad/ps5/nav_ps5_triangle.dds",
    color: C.RED,
  },
  [256681]: {
    texture: "/esoui/art/buttons/gamepad/ps5/nav_ps5_circle.dds",
    color: C.ORANGE,
  },
}

function onAffinity(
  this: void,
  changeType: number,
  unitTag: string,
  abilityId?: number
): undefined {
  if (changeType === EFFECT_RESULT_GAINED) {
    const affinity = AFFINITIES[abilityId as number] as Affinity
    CRUTCH.SetAttachedIconForUnit(
      unitTag,
      AFFINITY_UNIQUE_NAME,
      C.PRIORITY.MECHANIC_1_PRIORITY,
      affinity.texture,
      undefined,
      affinity.color
    )
  } else if (changeType === EFFECT_RESULT_FADED) {
    CRUTCH.RemoveAttachedIconForUnit(unitTag, AFFINITY_UNIQUE_NAME)
  }
}

let fightPhase = false
const PANEL_BOMB_INDEX = 8

function countDownToBomb(this: void, durationMs: number): undefined {
  CRUTCH.InfoPanel.CountDownDuration(PANEL_BOMB_INDEX, "Next Bombs: ", durationMs)
}

function onBomb(this: void): undefined {
  CRUTCH.dbgOther("bomb")
  if (fightPhase) {
    countDownToBomb(70000)
  }
}

function onSmokeStep(this: void): undefined {
  CRUTCH.dbgOther("smokestep")
  fightPhase = true
  countDownToBomb(10000)
}

function cleanUp(this: void): undefined {
  fightPhase = false
  CRUTCH.RemoveAllAttachedIcons(AFFINITY_UNIQUE_NAME)
  CRUTCH.InfoPanel.StopCount(PANEL_ESSENCE_INDEX)
  CRUTCH.InfoPanel.StopCount(PANEL_FULL_TEXT_INDEX)
  CRUTCH.InfoPanel.StopCount(PANEL_ORDER_INDEX)
  CRUTCH.InfoPanel.StopCount(PANEL_BOMB_INDEX)
}

function formatOrder(
  this: void,
  first: number,
  second: number,
  third: number,
  clockwise: boolean
): string {
  const strFormat = string.format("<<%d>> <<4>> <<%d>> <<4>> <<%d>>", first, second, third)
  const arrow = clockwise ? "rotation_arrow_reverse" : "rotation_arrow"
  return zo_strformat(
    strFormat,
    "|ccc33ff|t100%:100%:/esoui/art/buttons/gamepad/ps5/nav_ps5_square.dds:inheritcolor|t|r",
    "|cff0000|t100%:100%:/esoui/art/buttons/gamepad/ps5/nav_ps5_triangle.dds:inheritcolor|t|r",
    "|cff8000|t100%:100%:/esoui/art/buttons/gamepad/ps5/nav_ps5_circle.dds:inheritcolor|t|r",
    "|t100%:100%:/esoui/art/housing/" + arrow + ".dds|t"
  )
}

const CSA_STRINGS: Record<string, string> = {
  [crutchString("CRUTCH_CSA_ARID_VARLET_ESSENCE_ECLIPSE")]: formatOrder(1, 2, 3, false),
  [crutchString("CRUTCH_CSA_ARID_VARLET_ESSENCE_COBWEBS")]: formatOrder(2, 1, 3, true),
  [crutchString("CRUTCH_CSA_KNIGHTSHADE_ESSENCE_COBWEBS")]: formatOrder(2, 3, 1, false),
  [crutchString("CRUTCH_CSA_KNIGHTSHADE_ESSENCE_DRYLANDS")]: formatOrder(3, 2, 1, true),
  [crutchString("CRUTCH_CSA_WEB_EATER_ESSENCE_DRYLANDS")]: formatOrder(3, 1, 2, false),
  [crutchString("CRUTCH_CSA_WEB_EATER_ESSENCE_ECLIPSE")]: formatOrder(1, 3, 2, true),
}

let hooked = false
function csaHook(
  this: void,
  _s: unknown,
  messageParams: CenterScreenAnnounceMessageParams | undefined
): undefined {
  if (messageParams === undefined) return

  const mainText = messageParams.GetMainText()
  const order = CSA_STRINGS[mainText]
  if (order !== undefined) {
    if (CRUTCH.savedOptions.opulentordeal.showFullText) {
      CRUTCH.InfoPanel.SetLine(PANEL_FULL_TEXT_INDEX, mainText, 0.5)
    }
    if (CRUTCH.savedOptions.opulentordeal.showBrainless) {
      CRUTCH.InfoPanel.SetLine(PANEL_ORDER_INDEX, order)
    }
  }
}

CRUTCH.RegisterOpulentOrdeal = function (this: void) {
  CRUTCH.dbgOther("|c88FFFF[CT]|r Registered Opulent Ordeal")

  CRUTCH.RegisterExitedGroupCombatListener("CrutchOpulentOrdealExitedCombat", cleanUp)

  if (CRUTCH.savedOptions.opulentordeal.showAffinityIcons) {
    const idsToCallbacks: Record<number, (this: void, unitTag: string, hasBuff: boolean) => void> =
      {}
    for (const [id] of pairs(AFFINITIES)) {
      CRUTCH.RegisterForEffectChanged(
        "OOAffinity" + id,
        (
          _eventCode,
          changeType,
          _effectSlot,
          _effectName,
          unitTag,
          _beginTime,
          _endTime,
          _stackCount,
          _iconName,
          _buffType,
          _effectType,
          _abilityType,
          _statusEffectType,
          _unitName,
          _unitId,
          abilityId
        ) => {
          onAffinity(changeType, unitTag, abilityId)
        },
        id,
        "group"
      )

      idsToCallbacks[id] = (unitTag, hasBuff) => {
        if (hasBuff) {
          onAffinity(EFFECT_RESULT_GAINED, unitTag, id)
          CRUTCH.dbgSpam(GetUnitDisplayName(unitTag) + " has " + GetAbilityName(id))
        }
      }
    }

    CRUTCH.CheckGroupBuffs(idsToCallbacks, (unitTag, hasAnyBuffs) => {
      if (!hasAnyBuffs) {
        onAffinity(EFFECT_RESULT_FADED, unitTag)
        CRUTCH.dbgSpam(GetUnitDisplayName(unitTag) + " does not have any affinities")
      }
    })
  }

  if (CRUTCH.savedOptions.opulentordeal.showEssence) {
    for (const [summonId, data] of pairs(BOSS_ESSENCES)) {
      CRUTCH.RegisterForCombatEvent(
        "OOSummonEssence" + summonId,
        onSummonEssence,
        ACTION_RESULT_BEGIN,
        summonId
      )
      CRUTCH.RegisterForCombatEvent(
        "OOBossStunned" + data.stunnedId,
        onEssenceDone,
        undefined,
        data.stunnedId
      )
    }
  }

  if (CRUTCH.savedOptions.opulentordeal.showBombs) {
    CRUTCH.RegisterForCombatEvent("OOSmokeStep", onSmokeStep, ACTION_RESULT_BEGIN, 257513)
    CRUTCH.RegisterForCombatEvent(
      "OOSkitteringBomb",
      onBomb,
      ACTION_RESULT_EFFECT_GAINED_DURATION,
      256383
    )
    CRUTCH.RegisterForCombatEvent(
      "OOSorrowBomb",
      onBomb,
      ACTION_RESULT_EFFECT_GAINED_DURATION,
      256579
    )
    CRUTCH.RegisterForCombatEvent(
      "OOParchBomb",
      onBomb,
      ACTION_RESULT_EFFECT_GAINED_DURATION,
      256483
    )
  }

  if (!hooked) {
    hooked = true
    ZO_PreHook(CENTER_SCREEN_ANNOUNCE, "QueueMessage", csaHook)
  }
}

CRUTCH.UnregisterOpulentOrdeal = function (this: void, isSameZone: boolean) {
  CRUTCH.UnregisterExitedGroupCombatListener("CrutchOpulentOrdealExitedCombat")

  for (const [id] of pairs(AFFINITIES)) {
    CRUTCH.UnregisterForEffectChanged("OOAffinity" + id)
  }

  for (const [summonId, data] of pairs(BOSS_ESSENCES)) {
    CRUTCH.UnregisterForCombatEvent("OOSummonEssence" + summonId)
    CRUTCH.UnregisterForCombatEvent("OOBossStunned" + data.stunnedId)
  }

  CRUTCH.UnregisterForCombatEvent("OOSmokeStep")
  CRUTCH.UnregisterForCombatEvent("OOSkitteringBomb")
  CRUTCH.UnregisterForCombatEvent("OOSorrowBomb")
  CRUTCH.UnregisterForCombatEvent("OOParchBomb")

  if (!isSameZone) {
    cleanUp()
  }

  CRUTCH.dbgOther("|c88FFFF[CT]|r Unregistered Opulent Ordeal")
}

registerZone(1565, CRUTCH.RegisterOpulentOrdeal, CRUTCH.UnregisterOpulentOrdeal)
