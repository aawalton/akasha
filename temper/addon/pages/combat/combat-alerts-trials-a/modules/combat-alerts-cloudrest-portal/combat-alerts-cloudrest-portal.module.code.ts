import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-constants/combat-alerts-constants.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-info-panel-utils/combat-alerts-info-panel-utils.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-hub/combat-alerts-drawing-hub.module.code.ts"
import "akasha/temper/addon/pages/combat/combat-alerts-trials-c-declarations/combat-alerts-trials-c-declarations.type-declaration.d.ts"
import { PANEL_PORTAL_INDEX } from "akasha/temper/addon/pages/combat/combat-alerts-trials-a/modules/combat-alerts-cloudrest-flares/combat-alerts-cloudrest-flares.module.code.ts"
import {
  type CombatEventCallback,
  CRUTCH,
  type EffectChangedCallback,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

const C = CRUTCH.Constants

let nextPortal = 1
let portalActive = false

export function resetPortal(this: void): undefined {
  nextPortal = 1
  portalActive = false
  CRUTCH.InfoPanel.StopCount(PANEL_PORTAL_INDEX)
}

export function onPortalSummoned(this: void): undefined {
  CRUTCH.InfoPanel.StopCount(PANEL_PORTAL_INDEX)
  CRUTCH.InfoPanel.CountDownDuration(
    PANEL_PORTAL_INDEX,
    `|c88FFFFCurrent Portal (${nextPortal}): `,
    75000
  )
  portalActive = true
}

export const onPortalDone: CombatEventCallback = (
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
) => {
  if (!portalActive) return
  if (nextPortal === 1) {
    nextPortal = 2
  } else {
    nextPortal = 1
  }
  CRUTCH.dbgOther(string.format("portal done via %s (%d)", GetAbilityName(abilityId), abilityId))
  CRUTCH.InfoPanel.StopCount(PANEL_PORTAL_INDEX)
  CRUTCH.InfoPanel.CountDownDuration(
    PANEL_PORTAL_INDEX,
    `|c88FFFFNext Portal (${nextPortal}): `,
    45800
  )
  portalActive = false
}

export function onPortalInitial(this: void): undefined {
  CRUTCH.InfoPanel.StopCount(PANEL_PORTAL_INDEX)
  CRUTCH.InfoPanel.CountDownDuration(
    PANEL_PORTAL_INDEX,
    `|c88FFFFNext Portal (${nextPortal}): `,
    36600
  )
  portalActive = false
}

const GROUP_SHADOW_WORLD: Record<string, boolean> = {}

export const onShadowWorldChanged: EffectChangedCallback = (
  _eventCode,
  changeType,
  _effectSlot,
  _effectName,
  unitTag,
  _beginTime,
  _endTime,
  stackCount
) => {
  CRUTCH.dbgOther(
    string.format(
      "|c8C00FF%s(%s): %d %s|r",
      GetUnitDisplayName(unitTag),
      unitTag,
      stackCount,
      C.EFFECT_RESULTS[changeType]
    )
  )

  let changed = false
  if (changeType === EFFECT_RESULT_GAINED) {
    GROUP_SHADOW_WORLD[unitTag] = true
    changed = true
  } else if (changeType === EFFECT_RESULT_FADED) {
    GROUP_SHADOW_WORLD[unitTag] = false
    changed = true
  }

  if (changed) {
    if (AreUnitsEqual("player", unitTag)) {
      CRUTCH.Drawing.EvaluateAllSuppression()
    } else {
      CRUTCH.Drawing.EvaluateSuppressionFor(unitTag)
    }
  }
}

function isInShadowWorld(this: void, unitTag?: string): boolean {
  const tag = unitTag ?? CRUTCH.playerGroupTag

  if (GROUP_SHADOW_WORLD[tag] === true) return true

  return false
}
CRUTCH.IsInShadowWorld = isInShadowWorld

export const PORTAL_SUPPRESSION_FILTER = "CrutchAlertsCloudrestPortal"
export function crPortalFilter(this: void, unitTag: string): boolean {
  return isInShadowWorld(unitTag) === isInShadowWorld(CRUTCH.playerGroupTag)
}

const GROUP_SHADOW_OF_THE_FALLEN: Record<string, boolean> = {}

export const onShadowOfTheFallenChanged: EffectChangedCallback = (
  _eventCode,
  changeType,
  _effectSlot,
  _effectName,
  unitTag,
  _beginTime,
  _endTime,
  stackCount
) => {
  CRUTCH.dbgOther(
    string.format(
      "|cFF00FF%s(%s): %d %s|r",
      GetUnitDisplayName(unitTag),
      unitTag,
      stackCount,
      C.EFFECT_RESULTS[changeType]
    )
  )

  if (changeType === EFFECT_RESULT_GAINED) {
    GROUP_SHADOW_OF_THE_FALLEN[unitTag] = true
    CRUTCH.Drawing.OverrideDeadColor(unitTag, C.PURPLE)
  } else if (changeType === EFFECT_RESULT_FADED) {
    GROUP_SHADOW_OF_THE_FALLEN[unitTag] = false
    CRUTCH.Drawing.OverrideDeadColor(unitTag, undefined)
  }
}

function isShadeUp(this: void, unitTag: string): boolean {
  return GROUP_SHADOW_OF_THE_FALLEN[unitTag] === true
}

type OsiUnitErrorCheck = NonNullable<OsiLibrary["UnitErrorCheck"]>
type OsiGetIconDataForPlayer = NonNullable<OsiLibrary["GetIconDataForPlayer"]>

let origOSIUnitErrorCheck: OsiUnitErrorCheck | undefined
let origOSIGetIconDataForPlayer: OsiGetIconDataForPlayer | undefined

export function overrideOsi(this: void): undefined {
  if (
    OSI !== undefined &&
    OSI.UnitErrorCheck !== undefined &&
    OSI.GetIconDataForPlayer !== undefined
  ) {
    CRUTCH.dbgOther("|c88FFFF[CT]|r Overriding OSI.UnitErrorCheck and OSI.GetIconDataForPlayer")
    origOSIUnitErrorCheck = OSI.UnitErrorCheck
    OSI.UnitErrorCheck = (unitTag, allowSelf) => {
      const error = (origOSIUnitErrorCheck as OsiUnitErrorCheck)(unitTag, allowSelf)
      if (error !== 0) {
        return error
      }
      if (isInShadowWorld(CRUTCH.playerGroupTag) === isInShadowWorld(unitTag)) {
        return 0
      } else {
        return 8
      }
    }

    origOSIGetIconDataForPlayer = OSI.GetIconDataForPlayer
    OSI.GetIconDataForPlayer = (displayName, config, unitTag) => {
      const [icon, originalColor, size, anim, offset, isMech] = (
        origOSIGetIconDataForPlayer as OsiGetIconDataForPlayer
      )(displayName, config, unitTag)
      let color = originalColor

      const isDead = unitTag !== undefined ? IsUnitDead(unitTag) : false
      if (
        config.dead !== undefined &&
        config.dead !== false &&
        isDead &&
        isShadeUp(unitTag as string) &&
        CRUTCH.savedOptions.cloudrest.deathIconColor
      ) {
        color = C.PURPLE
      }

      return $multi(icon, color, size, anim, offset, isMech)
    }
  }
}

export function restoreOsi(this: void): undefined {
  if (OSI !== undefined && origOSIUnitErrorCheck !== undefined) {
    CRUTCH.dbgOther("|c88FFFF[CT]|r Restoring OSI.UnitErrorCheck and OSI.GetIconDataForPlayer")
    OSI.UnitErrorCheck = origOSIUnitErrorCheck
    OSI.GetIconDataForPlayer = origOSIGetIconDataForPlayer
  }
}
