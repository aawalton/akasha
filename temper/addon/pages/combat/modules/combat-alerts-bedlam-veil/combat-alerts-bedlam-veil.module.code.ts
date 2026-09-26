import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import { registerZone } from "akasha/temper/addon/pages/combat/modules/combat-alerts-zones/combat-alerts-zones.module.code.ts"

declare module "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts" {
  interface CrutchHub {
    DisplayDamageable: (this: void, time: number, displayFormat?: string) => void
  }
}

function onBesiege(this: void): undefined {
  const [currHealth, maxHealth] = GetUnitPower("boss1", COMBAT_MECHANIC_FLAGS_HEALTH)
  if (currHealth / maxHealth < 0.25) {
    CRUTCH.dbgSpam("Boss is under 25%, this is probably the 20% besiege")
    CRUTCH.DisplayDamageable(18.7)
  }
}

function registerBedlamVeil(this: void): undefined {
  CRUTCH.dbgOther("|c88FFFF[CT]|r Registered Bedlam Veil")

  if (CRUTCH.savedOptions.general.showDamageable) {
    CRUTCH.RegisterForCombatEvent("Besiege", onBesiege, ACTION_RESULT_EFFECT_GAINED, 213837)
  }
}

function unregisterBedlamVeil(this: void): undefined {
  CRUTCH.UnregisterForCombatEvent("Besiege")

  CRUTCH.dbgOther("|c88FFFF[CT]|r Unregistered Bedlam Veil")
}

registerZone(1471, registerBedlamVeil, unregisterBedlamVeil)
