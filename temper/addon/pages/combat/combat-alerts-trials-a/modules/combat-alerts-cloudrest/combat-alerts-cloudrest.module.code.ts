import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-hub/combat-alerts-drawing-hub.module.code.ts"
import "akasha/temper/addon/pages/combat/combat-alerts-trials-a/modules/combat-alerts-cloudrest-grapes/combat-alerts-cloudrest-grapes.module.code.ts"
import "akasha/temper/addon/pages/combat/combat-alerts-trials-a/modules/combat-alerts-cloudrest-minis/combat-alerts-cloudrest-minis.module.code.ts"
import {
  FLARE_UNIQUE_NAME,
  onAmuletSmashed,
  onRoaringFlareGained,
  onRoaringFlareIcon,
  resetAmulet,
} from "akasha/temper/addon/pages/combat/combat-alerts-trials-a/modules/combat-alerts-cloudrest-flares/combat-alerts-cloudrest-flares.module.code.ts"
import {
  FROST_UNIQUE_NAME,
  HOARFROST_CAST_EXECUTE_ID,
  HOARFROST_CAST_ID,
  HOARFROST_EXECUTE_ID,
  HOARFROST_ID,
  onAmplificationChanged,
  onHoarfrost,
  onHoarfrostCast,
  onShedHoarfrost,
  onVoltaicInitialDuration,
  resetFrosts,
} from "akasha/temper/addon/pages/combat/combat-alerts-trials-a/modules/combat-alerts-cloudrest-hoarfrost/combat-alerts-cloudrest-hoarfrost.module.code.ts"
import {
  crPortalFilter,
  onPortalDone,
  onPortalInitial,
  onPortalSummoned,
  onShadowOfTheFallenChanged,
  onShadowWorldChanged,
  overrideOsi,
  PORTAL_SUPPRESSION_FILTER,
  resetPortal,
  restoreOsi,
} from "akasha/temper/addon/pages/combat/combat-alerts-trials-a/modules/combat-alerts-cloudrest-portal/combat-alerts-cloudrest-portal.module.code.ts"
import {
  onOlorimeSpears,
  resetSpears,
} from "akasha/temper/addon/pages/combat/combat-alerts-trials-a/modules/combat-alerts-cloudrest-spears/combat-alerts-cloudrest-spears.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import { registerZone } from "akasha/temper/addon/pages/combat/modules/combat-alerts-zones/combat-alerts-zones.module.code.ts"

const CR = CRUTCH.Cloudrest

function resetValuesOnWipe(this: void): undefined {
  CRUTCH.dbgSpam("|cFF7777Resetting Cloudrest values|r")
  resetAmulet()
  resetSpears()
  resetFrosts()

  resetPortal()
}

const PORTAL_DONE_IDS = [104057, 104792]

function registerCloudrest(this: void): undefined {
  CRUTCH.dbgOther("|c88FFFF[CT]|r Registered Cloudrest")

  CR.RegisterGrapes()
  CR.RegisterMinis()

  CRUTCH.RegisterExitedGroupCombatListener("ExitedCombatCloudrest", resetValuesOnWipe)

  CRUTCH.RegisterForCombatEvent(
    "CloudrestBreakAmulet",
    onAmuletSmashed,
    ACTION_RESULT_EFFECT_GAINED,
    106023
  )

  const options = CRUTCH.savedOptions.cloudrest
  if (options.showFlareIcon) {
    CRUTCH.RegisterForCombatEvent(
      "CloudrestFlareIcon1",
      onRoaringFlareIcon,
      ACTION_RESULT_BEGIN,
      103531,
      COMBAT_UNIT_TYPE_NONE
    )
    CRUTCH.RegisterForCombatEvent(
      "CloudrestFlareIcon2",
      onRoaringFlareIcon,
      ACTION_RESULT_BEGIN,
      110431,
      COMBAT_UNIT_TYPE_NONE
    )
  }

  if (options.showFlaresSides) {
    CRUTCH.RegisterForCombatEvent(
      "CloudrestFlare1",
      onRoaringFlareGained,
      ACTION_RESULT_BEGIN,
      103531,
      COMBAT_UNIT_TYPE_NONE
    )
    CRUTCH.RegisterForCombatEvent(
      "CloudrestFlare2",
      onRoaringFlareGained,
      ACTION_RESULT_BEGIN,
      110431,
      COMBAT_UNIT_TYPE_NONE
    )
  }

  CRUTCH.RegisterForEffectChanged("CloudrestHoarfrost1", onHoarfrost, HOARFROST_ID, "group")
  CRUTCH.RegisterForCombatEvent(
    "CloudrestHoarfrostCast1",
    onHoarfrostCast,
    undefined,
    HOARFROST_CAST_ID
  )

  CRUTCH.RegisterForEffectChanged("CloudrestHoarfrost2", onHoarfrost, HOARFROST_EXECUTE_ID, "group")
  CRUTCH.RegisterForCombatEvent(
    "CloudrestHoarfrostCast2",
    onHoarfrostCast,
    undefined,
    HOARFROST_CAST_EXECUTE_ID
  )

  if (options.showVoltaicAlert) {
    CRUTCH.RegisterForCombatEvent(
      "VoltaicCurrentDuration",
      onVoltaicInitialDuration,
      ACTION_RESULT_EFFECT_GAINED_DURATION,
      103555,
      undefined,
      COMBAT_UNIT_TYPE_PLAYER
    )
  }

  CRUTCH.RegisterForCombatEvent(
    "OlorimeSpears",
    onOlorimeSpears,
    ACTION_RESULT_EFFECT_GAINED,
    104019,
    COMBAT_UNIT_TYPE_NONE
  )

  CRUTCH.RegisterForCombatEvent(
    "WelkynarsLight",
    onOlorimeSpears,
    ACTION_RESULT_EFFECT_GAINED_DURATION,
    104036
  )

  CRUTCH.RegisterForCombatEvent(
    "ShadowPiercerExit",
    onOlorimeSpears,
    ACTION_RESULT_EFFECT_GAINED_DURATION,
    104047
  )

  CRUTCH.RegisterForEffectChanged("ShadowWorldEffect", onShadowWorldChanged, 108045, "group")
  CRUTCH.RegisterForEffectChanged("ShadowWorldEffectCone", onShadowWorldChanged, 104620, "group")

  CRUTCH.RegisterForEffectChanged("ShadowFallenEffect", onShadowOfTheFallenChanged, 102271, "group")

  CRUTCH.RegisterForCombatEvent(
    "ShadowRealmCast",
    () => {
      resetSpears()
    },
    undefined,
    103946
  )

  if (options.infoPanel.showPortal) {
    CRUTCH.RegisterForCombatEvent("CRPortalCast", onPortalSummoned, undefined, 103946)
    for (const id of PORTAL_DONE_IDS) {
      CRUTCH.RegisterForCombatEvent(`CRPortalDone${id}`, onPortalDone, undefined, id)
    }
    CRUTCH.RegisterForCombatEvent("CRPortalInitial", onPortalInitial, undefined, 105890)
  }

  if (CRUTCH.savedOptions.general.showRaidDiag) {
    CRUTCH.RegisterForCombatEvent(
      "ShedHoarfrost",
      onShedHoarfrost,
      ACTION_RESULT_EFFECT_GAINED_DURATION,
      103714
    )

    CRUTCH.RegisterForEffectChanged("AmplificationDiag", onAmplificationChanged, 109022, "group")
  }

  overrideOsi()

  CRUTCH.Drawing.RegisterSuppressionFilter(PORTAL_SUPPRESSION_FILTER, crPortalFilter)
}

function unregisterCloudrest(this: void): undefined {
  CR.UnregisterGrapes()
  CR.UnregisterMinis()

  CRUTCH.UnregisterForCombatEvent("CRPortalCast")
  for (const id of PORTAL_DONE_IDS) {
    CRUTCH.UnregisterForCombatEvent(`CRPortalDone${id}`)
  }
  CRUTCH.UnregisterForCombatEvent("CRPortalInitial")

  CRUTCH.UnregisterExitedGroupCombatListener("ExitedCombatCloudrest")

  CRUTCH.UnregisterForCombatEvent("CloudrestBreakAmulet")
  CRUTCH.UnregisterForCombatEvent("CloudrestFlareIcon1")
  CRUTCH.UnregisterForCombatEvent("CloudrestFlareIcon2")
  CRUTCH.UnregisterForCombatEvent("CloudrestFlare1")
  CRUTCH.UnregisterForCombatEvent("CloudrestFlare2")
  CRUTCH.UnregisterForEffectChanged("CloudrestHoarfrost1")
  CRUTCH.UnregisterForCombatEvent("CloudrestHoarfrostCast1")
  CRUTCH.UnregisterForEffectChanged("CloudrestHoarfrost2")
  CRUTCH.UnregisterForCombatEvent("CloudrestHoarfrostCast2")
  CRUTCH.UnregisterForCombatEvent("VoltaicCurrentDuration")
  CRUTCH.UnregisterForCombatEvent("OlorimeSpears")
  CRUTCH.UnregisterForCombatEvent("WelkynarsLight")
  CRUTCH.UnregisterForCombatEvent("ShadowPiercerExit")
  CRUTCH.UnregisterForEffectChanged("ShadowWorldEffect")
  CRUTCH.UnregisterForEffectChanged("ShadowWorldEffectCone")
  CRUTCH.UnregisterForEffectChanged("ShadowFallenEffect")
  CRUTCH.UnregisterForCombatEvent("ShadowRealmCast")
  CRUTCH.UnregisterForCombatEvent("ShedHoarfrost")
  CRUTCH.UnregisterForEffectChanged("AmplificationDiag")

  restoreOsi()

  CRUTCH.Drawing.UnregisterSuppressionFilter(PORTAL_SUPPRESSION_FILTER)

  resetValuesOnWipe()

  CRUTCH.RemoveAllAttachedIcons(FROST_UNIQUE_NAME)
  CRUTCH.RemoveAllAttachedIcons(FLARE_UNIQUE_NAME)

  CRUTCH.dbgOther("|c88FFFF[CT]|r Unregistered Cloudrest")
}

registerZone(1051, registerCloudrest, unregisterCloudrest)
