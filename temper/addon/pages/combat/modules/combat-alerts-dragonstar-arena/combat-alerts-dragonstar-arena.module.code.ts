import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import { registerZone } from "akasha/temper/addon/pages/combat/modules/combat-alerts-zones/combat-alerts-zones.module.code.ts"

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchHub {
    DisplayDamageable: (this: void, time: number, displayFormat?: string) => void
  }
}

const TIME_TO_NEXT = 13100
let combatExitTime = 0

let round = 1

function onCombatExitedTimeout(this: void): undefined {
  if (CRUTCH.groupInCombat) return

  EVENT_MANAGER.UnregisterForUpdate(CRUTCH.name + "DSACombatTimeout")

  round = round + 1
  if (round > 5) {
    return
  }

  if (!CRUTCH.savedOptions.general.showDamageable) {
    return
  }

  const timer = combatExitTime + TIME_TO_NEXT - GetGameTimeMilliseconds()
  CRUTCH.DisplayDamageable(timer / 1000, "Portal spawns in ")
}

function onCombatExited(this: void): undefined {
  combatExitTime = GetGameTimeMilliseconds()
  EVENT_MANAGER.RegisterForUpdate(CRUTCH.name + "DSACombatTimeout", 8000, onCombatExitedTimeout)
}

function registerDragonstarArena(this: void): undefined {
  round = 1

  CRUTCH.RegisterExitedGroupCombatListener("DSACombatExit", onCombatExited)

  CRUTCH.dbgOther("|c88FFFF[CT]|r Registered Dragonstar Arena")
}

function unregisterDragonstarArena(this: void): undefined {
  CRUTCH.UnregisterExitedGroupCombatListener("DSACombatExit")

  CRUTCH.dbgOther("|c88FFFF[CT]|r Unregistered Dragonstar Arena")
}

registerZone(635, registerDragonstarArena, unregisterDragonstarArena)
