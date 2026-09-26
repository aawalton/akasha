import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/combat-alerts-trials-c-declarations/combat-alerts-trials-c-declarations.type-declaration.d.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-constants/combat-alerts-constants.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-hub/combat-alerts-drawing-hub.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-alerts-prominent/combat-alerts-alerts-prominent.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchHub {
    TestAspect: (this: void, unitTag: string, abilityId: number) => void
  }
}

const C = CRUTCH.Constants

export const ASPECT_UNIQUE_NAME = "CrutchAlertsMoLAspect"

const CURRENTLY_DISPLAYING_ABILITY: Record<string, number> = {}

interface AspectIcon {
  path: string
  color: number[]
}

const ASPECT_ICONS: Record<number, AspectIcon> = {
  [59639]: { path: "/esoui/art/ava/ava_rankicon64_lieutenant.dds", color: [0, 0, 1, 1] },
  [59640]: { path: "/esoui/art/ava/ava_rankicon64_prefect.dds", color: [1, 206 / 255, 0, 1] },
  [59699]: { path: "/esoui/art/ava/ava_rankicon64_legate.dds", color: [0, 0, 1, 1] },
  [75460]: { path: "/esoui/art/ava/ava_rankicon64_tribune.dds", color: [1, 206 / 255, 0, 1] },
}

export function onAspect(
  this: void,
  _eventCode: number,
  changeType: number,
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
  _unitId: number,
  abilityId: number
): undefined {
  const atName = GetUnitDisplayName(unitTag)
  if (changeType === EFFECT_RESULT_GAINED) {
    const iconData = ASPECT_ICONS[abilityId] as AspectIcon
    const iconPath = iconData.path
    CURRENTLY_DISPLAYING_ABILITY[atName] = abilityId

    if (CRUTCH.savedOptions.mawoflorkhaj.showTwinsIcons) {
      CRUTCH.dbgSpam(string.format("Setting |t100%%:100%%:%s|t for %s", iconPath, atName))
      CRUTCH.SetAttachedIconForUnit(
        unitTag,
        ASPECT_UNIQUE_NAME,
        C.PRIORITY.ASPECT,
        iconPath,
        100,
        iconData.color
      )
    }

    CRUTCH.Drawing.OverrideDeadColor(unitTag, iconData.color)
  } else if (changeType === EFFECT_RESULT_FADED) {
    if (abilityId === CURRENTLY_DISPLAYING_ABILITY[atName]) {
      CRUTCH.dbgSpam(
        string.format("Removing %s(%d) for %s", GetAbilityName(abilityId), abilityId, atName)
      )
      CRUTCH.RemoveAttachedIconForUnit(unitTag, ASPECT_UNIQUE_NAME)
      delete CURRENTLY_DISPLAYING_ABILITY[atName]

      CRUTCH.Drawing.OverrideDeadColor(unitTag, undefined)
    }
  }
}

CRUTCH.TestAspect = (unitTag, abilityId) => {
  onAspect(0, EFFECT_RESULT_GAINED, 0, "", unitTag, 0, 0, 0, "", "", 0, 0, 0, "", 0, abilityId)
}

export function onConversion(
  this: void,
  _eventCode: number,
  result: number,
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
  const unitTag = CRUTCH.groupIdToTag[targetUnitId]
  const atName: string | undefined = GetUnitDisplayName(unitTag as string)
  if (unitTag === undefined || atName === undefined) {
    CRUTCH.dbgSpam(string.format("couldn't find atName for %d", targetUnitId))
    return
  }

  if (result === ACTION_RESULT_EFFECT_GAINED_DURATION) {
    const iconData = ASPECT_ICONS[abilityId] as AspectIcon
    const iconPath = iconData.path
    CURRENTLY_DISPLAYING_ABILITY[atName] = abilityId

    if (CRUTCH.savedOptions.mawoflorkhaj.showTwinsIcons) {
      CRUTCH.dbgSpam(string.format("Setting |t100%%:100%%:%s|t for %s", iconPath, atName))
      CRUTCH.SetAttachedIconForUnit(
        unitTag,
        ASPECT_UNIQUE_NAME,
        C.PRIORITY.ASPECT,
        iconPath,
        100,
        iconData.color
      )
    }

    CRUTCH.Drawing.OverrideDeadColor(unitTag, iconData.color)

    if (
      atName === GetUnitDisplayName("player") &&
      CRUTCH.savedOptions.mawoflorkhaj.prominentColorSwap
    ) {
      CRUTCH.DisplayProminent(C.ID.COLOR_SWAP)
    }
  } else if (result === ACTION_RESULT_EFFECT_FADED) {
    if (abilityId === CURRENTLY_DISPLAYING_ABILITY[atName]) {
      CRUTCH.dbgSpam(
        string.format("Removing %s(%d) for %s", GetAbilityName(abilityId), abilityId, atName)
      )
      CRUTCH.RemoveAttachedIconForUnit(unitTag, ASPECT_UNIQUE_NAME)
      delete CURRENTLY_DISPLAYING_ABILITY[atName]

      CRUTCH.Drawing.OverrideDeadColor(unitTag, undefined)
    }
  }
}

export function refreshAllAspectIcons(this: void): undefined {
  CRUTCH.dbgOther("|cFF0000REFRESHING ALL ASPECT ICONS!")
  CRUTCH.RemoveAllAttachedIcons(ASPECT_UNIQUE_NAME)
  for (let i = 1; i <= MAX_GROUP_SIZE_THRESHOLD; i++) {
    CRUTCH.Drawing.OverrideDeadColor(`group${i}`, undefined)
  }

  for (let i = 1; i <= GetGroupSize(); i++) {
    const unitTag = GetGroupUnitTagByIndex(i)
    if (unitTag !== undefined && DoesUnitExist(unitTag)) {
      const atName = GetUnitDisplayName(unitTag)
      const abilityId = CURRENTLY_DISPLAYING_ABILITY[atName]
      if (abilityId !== undefined) {
        const iconData = ASPECT_ICONS[abilityId] as AspectIcon
        const iconPath = iconData.path

        if (CRUTCH.savedOptions.mawoflorkhaj.showTwinsIcons) {
          CRUTCH.dbgSpam(string.format("Refreshing |t100%%:100%%:%s|t for %s", iconPath, atName))
          CRUTCH.SetAttachedIconForUnit(
            unitTag,
            ASPECT_UNIQUE_NAME,
            C.PRIORITY.ASPECT,
            iconPath,
            100,
            iconData.color
          )
        }

        CRUTCH.Drawing.OverrideDeadColor(unitTag, iconData.color)
      }
    }
  }
}

export function cleanUpTwins(this: void): undefined {
  CRUTCH.RemoveAllAttachedIcons(ASPECT_UNIQUE_NAME)
  for (let i = 1; i <= MAX_GROUP_SIZE_THRESHOLD; i++) {
    CRUTCH.Drawing.OverrideDeadColor(`group${i}`, undefined)
    const unitTag = GetGroupUnitTagByIndex(i)
    if (unitTag !== undefined) {
      const atName: string | undefined = GetUnitDisplayName(unitTag)
      if (atName !== undefined) {
        delete CURRENTLY_DISPLAYING_ABILITY[atName]
      }
    }
  }
}

let origOSIGetIconDataForPlayer: OsiLibrary["GetIconDataForPlayer"]

export function overrideOsiDeadColor(this: void): undefined {
  if (OSI !== undefined && OSI.GetIconDataForPlayer !== undefined) {
    CRUTCH.dbgOther("|c88FFFF[CT]|r Overriding OSI.GetIconDataForPlayer")
    origOSIGetIconDataForPlayer = OSI.GetIconDataForPlayer
    OSI.GetIconDataForPlayer = (displayName, config, unitTag) => {
      const orig = origOSIGetIconDataForPlayer as NonNullable<OsiLibrary["GetIconDataForPlayer"]>
      let [icon, color, size, anim, offset, isMech] = orig(displayName, config, unitTag)

      const isDead = (unitTag !== undefined && IsUnitDead(unitTag)) || false
      if (config.dead === true && isDead) {
        const abilityId = CURRENTLY_DISPLAYING_ABILITY[displayName]
        if (abilityId === 59639 || abilityId === 59699) {
          color = [26 / 255, 36 / 255, 1]
        } else if (abilityId === 59640 || abilityId === 75460) {
          color = [1, 207 / 255, 0]
        }
      }

      return $multi(icon, color, size, anim, offset, isMech)
    }
  }
}

export function restoreOsiDeadColor(this: void): undefined {
  if (OSI !== undefined && origOSIGetIconDataForPlayer !== undefined) {
    CRUTCH.dbgOther("|c88FFFF[CT]|r Restoring OSI.GetIconDataForPlayer")
    OSI.GetIconDataForPlayer = origOSIGetIconDataForPlayer
  }
}
