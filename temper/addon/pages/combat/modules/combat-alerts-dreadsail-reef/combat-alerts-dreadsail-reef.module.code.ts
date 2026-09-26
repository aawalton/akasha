import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-alerts-prominent/combat-alerts-alerts-prominent.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-constants/combat-alerts-constants.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-dreadsail-reef-guardian/combat-alerts-dreadsail-reef-guardian.module.code.ts"
import {
  clearBrands,
  ELIXIR_ID,
  FIREBRAND_ID,
  FROSTBRAND_ID,
  onElixir,
  onFirebrand,
  onFrostbrand,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-dreadsail-brands/combat-alerts-dreadsail-brands.module.code.ts"
import {
  tryEnablingTaleriaCleave,
  uncleaveIfEnabled,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-dreadsail-taleria/combat-alerts-dreadsail-taleria.module.code.ts"
import {
  BEHEMOTH_ID,
  MAELSTROM_ID,
  onBehemothSummoned,
  onCombat,
  onLureOfTheSea,
  onMaelstromGainedDuration,
  onSirenSummoned,
  onWinterStorm,
  SIREN_ID,
  stopTaleriaCounts,
  WINTER_STORM_CCW_ID,
  WINTER_STORM_CW_ID,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-dreadsail-taleria-panel/combat-alerts-dreadsail-taleria-panel.module.code.ts"
import {
  onBossesChanged,
  onDestructiveEmber,
  onPiercingHailstone,
} from "akasha/temper/addon/pages/combat/modules/combat-alerts-dreadsail-twins/combat-alerts-dreadsail-twins.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import { crutchString } from "akasha/temper/addon/pages/combat/modules/combat-alerts-lang/combat-alerts-lang.module.code.ts"
import { registerZone } from "akasha/temper/addon/pages/combat/modules/combat-alerts-zones/combat-alerts-zones.module.code.ts"

const C = CRUTCH.Constants
const DSR = CRUTCH.DreadsailReef

function onLightningStacksChanged(
  this: void,
  _eventCode: number,
  changeType: number,
  _effectSlot: number,
  _effectName: string,
  _unitTag: string,
  _beginTime: number,
  _endTime: number,
  stackCount: number
): undefined {
  if (changeType === EFFECT_RESULT_GAINED || changeType === EFFECT_RESULT_UPDATED) {
    if (stackCount >= CRUTCH.savedOptions.dreadsailreef.staticThreshold) {
      CRUTCH.DisplayProminent(C.ID.STATIC)
    }
  }
}

function onPoisonStacksChanged(
  this: void,
  _eventCode: number,
  changeType: number,
  _effectSlot: number,
  _effectName: string,
  _unitTag: string,
  _beginTime: number,
  _endTime: number,
  stackCount: number
): undefined {
  if (changeType === EFFECT_RESULT_GAINED || changeType === EFFECT_RESULT_UPDATED) {
    if (stackCount >= CRUTCH.savedOptions.dreadsailreef.volatileThreshold) {
      CRUTCH.DisplayProminent(C.ID.POISON)
    }
  }
}

function cleanUp(this: void): undefined {
  clearBrands()
  stopTaleriaCounts()
}

function registerDreadsailReef(this: void): undefined {
  const options = CRUTCH.savedOptions.dreadsailreef
  CRUTCH.RegisterEnteredGroupCombatListener("CrutchDSREnteredGroupCombat", onCombat)
  CRUTCH.RegisterExitedGroupCombatListener("CrutchDSRExitedGroupCombat", cleanUp)

  if (CRUTCH.savedOptions.general.showRaidDiag) {
    CRUTCH.RegisterForEffectChanged("DSRDestructiveEmber", onDestructiveEmber, 166209, "group")
    CRUTCH.RegisterForEffectChanged("DSRPiercingHailstone", onPiercingHailstone, 166178, "group")
  }

  CRUTCH.RegisterBossChangedListener("CrutchDSRBossChanged", onBossesChanged)
  onBossesChanged()

  if (options.stackBrands) {
    CRUTCH.RegisterForCombatEvent(
      "DSRFirebrand",
      onFirebrand,
      ACTION_RESULT_EFFECT_GAINED_DURATION,
      FIREBRAND_ID
    )
    CRUTCH.RegisterForCombatEvent(
      "DSRFrostbrand",
      onFrostbrand,
      ACTION_RESULT_EFFECT_GAINED_DURATION,
      FROSTBRAND_ID
    )
  }

  if (options.showElixirs) {
    CRUTCH.RegisterForCombatEvent("DSRElixir", onElixir, ACTION_RESULT_EFFECT_GAINED, ELIXIR_ID)
  }

  if (options.alertStaticStacks) {
    CRUTCH.RegisterForEffectChanged("DSRStaticBoss", onLightningStacksChanged, 163575, "player")
    CRUTCH.RegisterForEffectChanged("DSRStaticOther", onLightningStacksChanged, 169688, "player")
  }

  if (options.alertVolatileStacks) {
    CRUTCH.RegisterForEffectChanged("DSRVolatileBoss", onPoisonStacksChanged, 174835, "player")
    CRUTCH.RegisterForEffectChanged("DSRVolatileOther", onPoisonStacksChanged, 174932, "player")
  }

  if (CRUTCH.savedOptions.experimental === true) {
    DSR.RegisterReefGuardian()
  }

  CRUTCH.RegisterBossChangedListener("CrutchDreadsailReef", tryEnablingTaleriaCleave)
  tryEnablingTaleriaCleave()

  if (options.infoPanel.showMaelstrom) {
    CRUTCH.RegisterForCombatEvent(
      "DSRMaelstrom",
      onMaelstromGainedDuration,
      ACTION_RESULT_EFFECT_GAINED_DURATION,
      MAELSTROM_ID
    )
  }
  if (options.infoPanel.showBehemothSpawn) {
    CRUTCH.RegisterForCombatEvent(
      "DSRBehemoth",
      onBehemothSummoned,
      ACTION_RESULT_BEGIN,
      BEHEMOTH_ID
    )
  }
  if (options.infoPanel.showWinterStorm) {
    CRUTCH.RegisterForCombatEvent(
      "DSRWinterStorm",
      onWinterStorm,
      ACTION_RESULT_EFFECT_GAINED,
      WINTER_STORM_CW_ID
    )
    CRUTCH.RegisterForCombatEvent(
      "DSRWinterStormCCW",
      onWinterStorm,
      ACTION_RESULT_EFFECT_GAINED,
      WINTER_STORM_CCW_ID
    )
  }
  if (options.infoPanel.showSirenSpawn) {
    CRUTCH.RegisterForCombatEvent("DSRSiren", onSirenSummoned, ACTION_RESULT_BEGIN, SIREN_ID)
  }

  if (options.lureSound) {
    CRUTCH.RegisterForCombatEvent(
      "DSRLureOfTheSea",
      onLureOfTheSea,
      ACTION_RESULT_BEGIN,
      163952,
      undefined,
      COMBAT_UNIT_TYPE_PLAYER
    )
  }

  CRUTCH.dbgOther("|c88FFFF[CT]|r Registered Dreadsail Reef")
}

function unregisterDreadsailReef(this: void): undefined {
  CRUTCH.UnregisterEnteredGroupCombatListener("CrutchDSREnteredGroupCombat")
  CRUTCH.UnregisterExitedGroupCombatListener("CrutchDSRExitedGroupCombat")
  cleanUp()

  CRUTCH.UnregisterForEffectChanged("DSRDestructiveEmber")
  CRUTCH.UnregisterForEffectChanged("DSRPiercingHailstone")

  CRUTCH.UnregisterBossChangedListener("CrutchDSRBossChanged")
  CRUTCH.BossHealthBar.RemoveThresholdOverride(
    CRUTCH.GetCapitalizedString(crutchString("CRUTCH_BHB_LYLANAR"))
  )

  CRUTCH.UnregisterForCombatEvent("DSRFirebrand")
  CRUTCH.UnregisterForCombatEvent("DSRFrostbrand")

  CRUTCH.UnregisterForCombatEvent("DSRElixir")

  CRUTCH.UnregisterForEffectChanged("DSRStaticBoss")
  CRUTCH.UnregisterForEffectChanged("DSRStaticOther")

  CRUTCH.UnregisterForEffectChanged("DSRVolatileBoss")
  CRUTCH.UnregisterForEffectChanged("DSRVolatileOther")

  if (CRUTCH.savedOptions.experimental === true) {
    DSR.UnregisterReefGuardian()
  }

  CRUTCH.UnregisterBossChangedListener("CrutchDreadsailReef")
  uncleaveIfEnabled()

  CRUTCH.UnregisterForCombatEvent("DSRMaelstrom")
  CRUTCH.UnregisterForCombatEvent("DSRBehemoth")
  CRUTCH.UnregisterForCombatEvent("DSRWinterStorm")
  CRUTCH.UnregisterForCombatEvent("DSRWinterStormCCW")
  CRUTCH.UnregisterForCombatEvent("DSRSiren")
  CRUTCH.UnregisterForCombatEvent("DSRPlatformFall")

  CRUTCH.UnregisterForCombatEvent("DSRLureOfTheSea")

  CRUTCH.dbgOther("|c88FFFF[CT]|r Unregistered Dreadsail Reef")
}

registerZone(1344, registerDreadsailReef, unregisterDreadsailReef)
