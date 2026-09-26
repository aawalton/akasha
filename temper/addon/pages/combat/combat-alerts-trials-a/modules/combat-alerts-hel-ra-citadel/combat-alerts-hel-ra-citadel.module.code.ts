import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-constants/combat-alerts-constants.module.code.ts"
import type {
  DrawingIcon,
  DrawingKey,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-hub/combat-alerts-drawing-hub.module.code.ts"
import {
  CRUTCH,
  type EffectChangedCallback,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import { registerZone } from "akasha/temper/addon/pages/combat/modules/combat-alerts-zones/combat-alerts-zones.module.code.ts"

const C = CRUTCH.Constants

const CIRCLE_KEYS: Record<string, DrawingKey> = {}
const onStoned: EffectChangedCallback = (
  _eventCode,
  changeType,
  _effectSlot,
  _effectName,
  unitTag
) => {
  if (changeType === EFFECT_RESULT_UPDATED) return

  const atName = GetUnitDisplayName(unitTag)
  let key = CIRCLE_KEYS[atName]
  if (key !== undefined) {
    CRUTCH.Drawing.RemoveGroundCircle(key)
    delete CIRCLE_KEYS[atName]
  }

  if (changeType === EFFECT_RESULT_GAINED) {
    const [, x, y, z] = GetUnitRawWorldPosition(unitTag)

    const circleFunc = (icon: DrawingIcon) => {
      const [, iconX, iconY, iconZ] = GetUnitRawWorldPosition(unitTag)
      icon.SetPosition(icon, iconX, iconY, iconZ)
    }

    key = CRUTCH.Drawing.CreateGroundCircle(x, y, z, 8, C.RED_2, undefined, circleFunc, false)
    CIRCLE_KEYS[atName] = key
  }
}

function cleanUp(this: void): undefined {
  for (const [, key] of pairs(CIRCLE_KEYS)) {
    CRUTCH.Drawing.RemoveGroundCircle(key)
  }
  ZO_ClearTable(CIRCLE_KEYS)
}

function registerHelRaCitadel(this: void): undefined {
  CRUTCH.dbgOther("|c88FFFF[CT]|r Registered Hel Ra Citadel")

  CRUTCH.RegisterExitedGroupCombatListener("CrutchHRCStonedExitedCombat", cleanUp)

  if (CRUTCH.savedOptions.helracitadel.showStoneFormCircle) {
    CRUTCH.RegisterForEffectChanged("HRCStoned", onStoned, 56577, "group")
  }
}

function unregisterHelRaCitadel(this: void): undefined {
  CRUTCH.UnregisterExitedGroupCombatListener("CrutchHRCStonedExitedCombat")
  CRUTCH.UnregisterForEffectChanged("HRCStoned")
  cleanUp()

  CRUTCH.dbgOther("|c88FFFF[CT]|r Unregistered Hel Ra Citadel")
}

registerZone(636, registerHelRaCitadel, unregisterHelRaCitadel)
