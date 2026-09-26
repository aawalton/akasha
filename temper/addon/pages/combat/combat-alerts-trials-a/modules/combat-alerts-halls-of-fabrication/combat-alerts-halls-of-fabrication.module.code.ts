import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-constants/combat-alerts-constants.module.code.ts"
import type { DrawingKey } from "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-hub/combat-alerts-drawing-hub.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import { registerZone } from "akasha/temper/addon/pages/combat/modules/combat-alerts-zones/combat-alerts-zones.module.code.ts"

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchHub {
    DisplayDamageable: (this: void, time: number, displayFormat?: string) => void
    EnableTripletsCircle: (this: void, x?: number, y?: number, z?: number, radius?: number) => void
  }
}

const C = CRUTCH.Constants

let spooderPulled = false

function handleCombatState(this: void, _eventCode: number, inCombat: boolean): undefined {
  if (!inCombat) {
    spooderPulled = false
  }
}

function handleOverheadRail(this: void): undefined {
  if (spooderPulled) {
    return
  }

  spooderPulled = true
  CRUTCH.DisplayDamageable(23.2)
}

let tripletsCircleKey: DrawingKey | undefined
function enableTripletsCircle(
  this: void,
  x?: number,
  y?: number,
  z?: number,
  radius?: number
): undefined {
  if (tripletsCircleKey !== undefined) {
    CRUTCH.Drawing.RemoveGroundCircle(tripletsCircleKey)
    tripletsCircleKey = undefined
  }

  tripletsCircleKey = CRUTCH.Drawing.CreateGroundCircle(
    x ?? 30155,
    y ?? 52960,
    z ?? 73255,
    radius ?? 3.1,
    C.RED
  )
}
CRUTCH.EnableTripletsCircle = enableTripletsCircle

function registerHallsOfFabrication(this: void): undefined {
  CRUTCH.dbgOther("|c88FFFF[CT]|r Registered Halls of Fabrication")

  if (CRUTCH.savedOptions.general.showDamageable) {
    EVENT_MANAGER.RegisterForEvent(
      `${CRUTCH.name}DamageableCombatState`,
      EVENT_PLAYER_COMBAT_STATE,
      handleCombatState
    )
    CRUTCH.RegisterForCombatEvent("Spooder", handleOverheadRail, undefined, 94805)
  }

  if (CRUTCH.savedOptions.hallsoffabrication.showTripletsIcon) {
    enableTripletsCircle()
  }

  if (CRUTCH.savedOptions.hallsoffabrication.showAGIcons) {
    CRUTCH.EnableIconGroup("AGExecute")
  }
}

function unregisterHallsOfFabrication(this: void): undefined {
  EVENT_MANAGER.UnregisterForEvent(`${CRUTCH.name}DamageableCombatState`, EVENT_PLAYER_COMBAT_STATE)
  CRUTCH.UnregisterForCombatEvent("Spooder")

  if (tripletsCircleKey !== undefined) {
    CRUTCH.Drawing.RemoveGroundCircle(tripletsCircleKey)
    tripletsCircleKey = undefined
  }

  CRUTCH.DisableIconGroup("AGExecute")

  CRUTCH.dbgOther("|c88FFFF[CT]|r Unregistered Halls of Fabrication")
}

registerZone(975, registerHallsOfFabrication, unregisterHallsOfFabrication)
