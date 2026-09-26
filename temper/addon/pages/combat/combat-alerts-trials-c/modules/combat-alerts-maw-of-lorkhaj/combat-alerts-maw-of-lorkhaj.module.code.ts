import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-hub/combat-alerts-drawing-hub.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-alerts-core/combat-alerts-alerts-core.module.code.ts"
import {
  padLabel,
  registerZhajhassa,
  unregisterZhajhassa,
} from "akasha/temper/addon/pages/combat/combat-alerts-trials-c/modules/combat-alerts-maw-pads/combat-alerts-maw-pads.module.code.ts"
import {
  ASPECT_UNIQUE_NAME,
  cleanUpTwins,
  onAspect,
  onConversion,
  overrideOsiDeadColor,
  refreshAllAspectIcons,
  restoreOsiDeadColor,
} from "akasha/temper/addon/pages/combat/combat-alerts-trials-c/modules/combat-alerts-maw-twins/combat-alerts-maw-twins.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import { registerZone } from "akasha/temper/addon/pages/combat/modules/combat-alerts-zones/combat-alerts-zones.module.code.ts"

function registerTwins(this: void): undefined {
  CRUTCH.RegisterExitedGroupCombatListener("CrutchMoLExitedCombat", cleanUpTwins)

  CRUTCH.RegisterUnitTagListener("CrutchAlertsMoLAspectRefresh", refreshAllAspectIcons)

  CRUTCH.RegisterForEffectChanged("TwinsShadow", onAspect, 59639, "group")
  CRUTCH.RegisterForEffectChanged("TwinsLunar", onAspect, 59640, "group")

  CRUTCH.RegisterForCombatEvent("TwinsShadowConversion", onConversion, undefined, 59699)
  CRUTCH.RegisterForCombatEvent("TwinsLunarConversion", onConversion, undefined, 75460)

  overrideOsiDeadColor()
}

function unregisterTwins(this: void): undefined {
  CRUTCH.UnregisterExitedGroupCombatListener("CrutchMoLExitedCombat")
  cleanUpTwins()

  CRUTCH.UnregisterUnitTagListener("CrutchAlertsMoLAspectRefresh")

  CRUTCH.UnregisterForEffectChanged("TwinsShadow")
  CRUTCH.UnregisterForEffectChanged("TwinsLunar")
  CRUTCH.UnregisterForCombatEvent("TwinsShadowConversion")
  CRUTCH.UnregisterForCombatEvent("TwinsLunarConversion")

  restoreOsiDeadColor()
}

function onVoidShackleDamage(this: void): undefined {
  CRUTCH.DisplayNotification(75507, "|c6a00ffTETHERED!|r", 1100, 0, 0, 0, 0, 0, 0, 0, false)
}

function registerRakkhat(this: void): undefined {
  CRUTCH.RegisterForCombatEvent(
    "RakkhatVoidShackle",
    onVoidShackleDamage,
    ACTION_RESULT_DAMAGE,
    75507,
    undefined,
    COMBAT_UNIT_TYPE_PLAYER
  )
}

function unregisterRakkhat(this: void): undefined {
  CRUTCH.UnregisterForCombatEvent("RakkhatVoidShackle")
}

function applyStyle(this: void, style: string): undefined {
  for (let i = 1; i <= 6; i++) {
    padLabel(i).SetFont(style)
  }
}

let initialized = false

function initFont(this: void): undefined {
  if (initialized) {
    return
  }
  initialized = true

  ZO_PlatformStyle.New(applyStyle, "$(BOLD_FONT)|20|soft-shadow-thick", "ZoFontGamepad27")
}

function registerMawOfLorkhaj(this: void): undefined {
  CRUTCH.dbgOther("|c88FFFF[CT]|r Registered Maw of Lorkhaj")

  initFont()

  registerZhajhassa()

  registerTwins()

  registerRakkhat()
}

function unregisterMawOfLorkhaj(this: void): undefined {
  unregisterZhajhassa()
  unregisterTwins()
  unregisterRakkhat()

  CRUTCH.RemoveAllAttachedIcons(ASPECT_UNIQUE_NAME)

  CRUTCH.dbgOther("|c88FFFF[CT]|r Unregistered Maw of Lorkhaj")
}

registerZone(725, registerMawOfLorkhaj, unregisterMawOfLorkhaj)
