import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-trials-b-reach/combat-alerts-trials-b-reach.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"

const C = CRUTCH.Constants

export const PANEL_FOCUS_FIRE_INDEX = 5

const YOL_HEALTH_NORM = 22721708
const YOL_HEALTH_VET = 116430960
const YOL_HEALTH_HM = 145538704

function countDownFocusFire(this: void, durationMs: number): undefined {
  if (CRUTCH.savedOptions.sunspire.panel.showFocusFire) {
    CRUTCH.InfoPanel.CountDownDuration(
      PANEL_FOCUS_FIRE_INDEX,
      "|cff6600" + GetAbilityName(121722) + ": ",
      durationMs
    )
  }
}

export function onEnteredCombatYol(this: void): undefined {
  const [, maxPower] = GetUnitPower("boss1", COMBAT_MECHANIC_FLAGS_HEALTH)
  if (maxPower === YOL_HEALTH_HM || maxPower === YOL_HEALTH_VET || maxPower === YOL_HEALTH_NORM) {
    countDownFocusFire(6900)
  }
}

export function disableYolIcons(this: void): undefined {
  CRUTCH.DisableIcon("YolWing2")
  CRUTCH.DisableIcon("YolWing3")
  CRUTCH.DisableIcon("YolWing4")
  CRUTCH.DisableIcon("YolHead2")
  CRUTCH.DisableIcon("YolHead3")
  CRUTCH.DisableIcon("YolHead4")
}

export function onYolFly75(this: void): undefined {
  if (CRUTCH.savedOptions.general.showDamageable) {
    CRUTCH.DisplayDamageable(22.8)
  }

  if (!CRUTCH.savedOptions.sunspire.showYolIcons) return
  if (CRUTCH.savedOptions.sunspire.yolLeftIcons) {
    CRUTCH.EnableIcon("YolLeftWing2")
    CRUTCH.EnableIcon("YolLeftHead2")
  } else {
    CRUTCH.EnableIcon("YolWing2")
    CRUTCH.EnableIcon("YolHead2")
  }
  zo_callLater(function (this: void) {
    CRUTCH.DisableIcon("YolWing2")
    CRUTCH.DisableIcon("YolHead2")
    CRUTCH.DisableIcon("YolLeftWing2")
    CRUTCH.DisableIcon("YolLeftHead2")
  }, 25000)
}

export function onYolFly50(this: void): undefined {
  if (CRUTCH.savedOptions.general.showDamageable) {
    CRUTCH.DisplayDamageable(23.4)
  }

  if (!CRUTCH.savedOptions.sunspire.showYolIcons) return
  if (CRUTCH.savedOptions.sunspire.yolLeftIcons) {
    CRUTCH.EnableIcon("YolLeftWing3")
    CRUTCH.EnableIcon("YolLeftHead3")
  } else {
    CRUTCH.EnableIcon("YolWing3")
    CRUTCH.EnableIcon("YolHead3")
  }
  zo_callLater(function (this: void) {
    CRUTCH.DisableIcon("YolWing3")
    CRUTCH.DisableIcon("YolHead3")
    CRUTCH.DisableIcon("YolLeftWing3")
    CRUTCH.DisableIcon("YolLeftHead3")
  }, 25000)
}

export function onYolFly25(this: void): undefined {
  if (CRUTCH.savedOptions.general.showDamageable) {
    CRUTCH.DisplayDamageable(23.5)
  }

  if (!CRUTCH.savedOptions.sunspire.showYolIcons) return
  if (CRUTCH.savedOptions.sunspire.yolLeftIcons) {
    CRUTCH.EnableIcon("YolLeftWing4")
    CRUTCH.EnableIcon("YolLeftHead4")
  } else {
    CRUTCH.EnableIcon("YolWing4")
    CRUTCH.EnableIcon("YolHead4")
  }
  zo_callLater(function (this: void) {
    CRUTCH.DisableIcon("YolWing4")
    CRUTCH.DisableIcon("YolHead4")
    CRUTCH.DisableIcon("YolLeftWing4")
    CRUTCH.DisableIcon("YolLeftHead4")
  }, 25000)
}

export function onYolFly(this: void): undefined {
  const [currHealth, maxHealth] = GetUnitPower("boss1", COMBAT_MECHANIC_FLAGS_HEALTH)
  const percent = currHealth / maxHealth
  if (percent < 0.3) {
    onYolFly25()
  } else if (percent < 0.55) {
    onYolFly50()
  } else if (percent < 0.8) {
    onYolFly75()
  }

  countDownFocusFire(28900)
}

export const FOCUSED_FIRE_UNIQUE_NAME = "CrutchAlertsSSFocusedFire"

export function onFocusFireGained(
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
  const targetTag = CRUTCH.groupIdToTag[targetUnitId]
  CRUTCH.dbgOther(zo_strformat("<<1>> is targeted", GetUnitDisplayName(targetTag as string)))

  countDownFocusFire(32100)

  const toClear: string[] = []
  for (let groupIndex = 1; groupIndex <= GetGroupSize(); groupIndex++) {
    const unitTag = GetGroupUnitTagByIndex(groupIndex) as string
    let hasFocusedFire = false
    for (let i = 1; i <= GetNumBuffs(unitTag); i++) {
      const [buffName, , , , stackCount, , , , , , abilityId] = GetUnitBuffInfo(unitTag, i)
      if (abilityId === 121726) {
        if (CRUTCH.savedOptions.general.showRaidDiag) {
          CRUTCH.msg(
            zo_strformat(
              "|cAAAAAA<<1>> has <<2>> x <<3>>",
              GetUnitDisplayName(unitTag),
              stackCount,
              buffName
            )
          )
        }
        hasFocusedFire = true
        break
      }
    }

    if (CRUTCH.savedOptions.sunspire.yolFocusedFire && !hasFocusedFire && unitTag !== targetTag) {
      CRUTCH.SetAttachedIconForUnit(
        unitTag,
        FOCUSED_FIRE_UNIQUE_NAME,
        C.PRIORITY.MECHANIC_1_PRIORITY,
        "TemperCombat/assets/shape/chevron.dds",
        30,
        [0, 1, 1, 0.6],
        false
      )
      toClear.push(unitTag)
    }
  }

  EVENT_MANAGER.RegisterForUpdate(CRUTCH.name + "ClearIcons", 7000, function (this: void) {
    EVENT_MANAGER.UnregisterForUpdate(CRUTCH.name + "ClearIcons")
    for (const unitTag of toClear) {
      CRUTCH.RemoveAttachedIconForUnit(unitTag, FOCUSED_FIRE_UNIQUE_NAME)
    }
  })
}
