import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-constants/combat-alerts-constants.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-alerts-core/combat-alerts-alerts-core.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-info-panel-utils/combat-alerts-info-panel-utils.module.code.ts"
import type {
  DrawingGetCompositeTexture,
  DrawingIcon,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-hub/combat-alerts-drawing-hub.module.code.ts"
import {
  type CombatEventCallback,
  CRUTCH,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchHub {
    OnRoaringFlareIcon: CombatEventCallback
  }
}

const C = CRUTCH.Constants

export const PANEL_PORTAL_INDEX = 3

let amuletSmashed = false

export function resetAmulet(this: void): undefined {
  amuletSmashed = false
}

export const FLARE_UNIQUE_NAME = "CrutchAlertsCRFlare"

const CYCLE_TIME = 700
function roaringFlareUpdate(this: void, icon: DrawingIcon): undefined {
  const time = GetGameTimeMilliseconds() % CYCLE_TIME
  const t = time / CYCLE_TIME
  CRUTCH.Drawing.Animation.BoostUpdate(
    (icon.GetCompositeTexture as DrawingGetCompositeTexture)(icon),
    t
  )
}

export const onRoaringFlareIcon: CombatEventCallback = (
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
  const unitTag = CRUTCH.groupIdToTag[targetUnitId]

  if (unitTag === undefined) return

  CRUTCH.SetAttachedIconForUnit(
    unitTag,
    FLARE_UNIQUE_NAME,
    C.PRIORITY.MECHANIC_2_PRIORITY,
    undefined,
    120,
    undefined,
    false,
    roaringFlareUpdate,
    {
      composite: {
        size: 1,
        init: (composite) => {
          CRUTCH.Drawing.Animation.BoostInitial(composite, C.RED, C.YELLOW)
        },
      },
    }
  )
  zo_callLater(() => {
    CRUTCH.RemoveAttachedIconForUnit(unitTag, FLARE_UNIQUE_NAME)
  }, 7000)
}
CRUTCH.OnRoaringFlareIcon = onRoaringFlareIcon

export const onRoaringFlareGained: CombatEventCallback = (
  _eventCode,
  result,
  _isError,
  _abilityName,
  _abilityGraphic,
  _abilityActionSlotType,
  sourceName,
  sourceType,
  _targetName,
  targetType,
  hitValue,
  _powerType,
  _damageType,
  _log,
  sourceUnitId,
  targetUnitId,
  abilityId
) => {
  if (!amuletSmashed) return

  let targetName: string | undefined = GetUnitDisplayName(
    CRUTCH.groupIdToTag[targetUnitId] as string
  )
  if (targetName !== undefined) {
    targetName = zo_strformat("<<1>>", targetName)
  } else {
    targetName = "UNKNOWN"
  }

  if (abilityId === 103531) {
    const label = string.format(
      "|cff7700%s |cff0000|t100%%:100%%:Esoui/Art/Buttons/large_leftarrow_up.dds:inheritcolor|t |caaaaaaLEFT|r",
      targetName
    )
    CRUTCH.DisplayNotification(
      abilityId,
      label,
      hitValue,
      sourceUnitId,
      sourceName,
      sourceType,
      targetUnitId,
      targetName,
      targetType,
      result,
      true
    )
    if (CRUTCH.savedOptions.general.showRaidDiag) {
      CRUTCH.msg(zo_strformat("|cFF7700<<1>> < LEFT|r", targetName))
    }
  } else if (abilityId === 110431) {
    const label = string.format(
      "|cff7700%s |cff0000|t100%%:100%%:Esoui/Art/Buttons/large_rightarrow_up.dds:inheritcolor|t |caaaaaaRIGHT|r",
      targetName
    )
    CRUTCH.DisplayNotification(
      abilityId,
      label,
      hitValue,
      sourceUnitId,
      sourceName,
      sourceType,
      targetUnitId,
      targetName,
      targetType,
      result,
      true
    )
    if (CRUTCH.savedOptions.general.showRaidDiag) {
      CRUTCH.msg(zo_strformat("|cFF7700<<1>> > RIGHT|r", targetName))
    }
  }
}

export function onAmuletSmashed(this: void): undefined {
  amuletSmashed = true
  CRUTCH.InfoPanel.StopCount(PANEL_PORTAL_INDEX)
}
