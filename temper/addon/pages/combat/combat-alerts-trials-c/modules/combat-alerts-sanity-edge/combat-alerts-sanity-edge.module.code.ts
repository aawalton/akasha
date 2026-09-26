import "akasha/temper/addon/pages/combat/modules/combat-alerts-eso-reach/combat-alerts-eso-reach.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-drawing-hub/combat-alerts-drawing-hub.module.code.ts"
import "akasha/temper/addon/pages/combat/modules/combat-alerts-info-panel-utils/combat-alerts-info-panel-utils.module.code.ts"
import {
  ATTUNEMENT_ID,
  BREAKDOWN_DATA,
  CALAMITY_ID,
  clearAttuned,
  onAttunement,
  onBreakdownFaded,
  onBreakdownSplits,
  onCalamity,
  onCalamityRitual,
  onPoisonedMind,
  onRitual,
  onUnattuned,
  onWrathstorm,
  PANEL_CALAMITY_INDEX,
  PANEL_WRATHSTORM_INDEX,
  POISONED_MIND_UNIQUE_NAME,
  UNATTUNED_ID,
  untrackAll,
  WRATHSTORM_ID,
} from "akasha/temper/addon/pages/combat/combat-alerts-trials-c/modules/combat-alerts-sanity-ansuul/combat-alerts-sanity-ansuul.module.code.ts"
import {
  checkMantle,
  disableChimeraIcons,
  FROST_BOMB_DOUBLE_ID,
  FROST_BOMB_ID,
  onActivated,
  onFrostBomb,
  PANEL_ARCTIC_INDEX,
  PANEL_FROST_BOMB_INDEX,
  resetArctic,
} from "akasha/temper/addon/pages/combat/combat-alerts-trials-c/modules/combat-alerts-sanity-chimera/combat-alerts-sanity-chimera.module.code.ts"
import { CRUTCH } from "akasha/temper/addon/pages/combat/modules/combat-alerts-hub/combat-alerts-hub.module.code.ts"
import { registerZone } from "akasha/temper/addon/pages/combat/modules/combat-alerts-zones/combat-alerts-zones.module.code.ts"

function cleanUp(this: void): undefined {
  resetArctic()
  CRUTCH.InfoPanel.StopCount(PANEL_FROST_BOMB_INDEX)
  CRUTCH.InfoPanel.StopCount(PANEL_ARCTIC_INDEX)
  CRUTCH.InfoPanel.StopCount(PANEL_WRATHSTORM_INDEX)
  CRUTCH.InfoPanel.StopCount(PANEL_CALAMITY_INDEX)
  clearAttuned()

  CRUTCH.RemoveAllAttachedIcons(POISONED_MIND_UNIQUE_NAME)

  untrackAll()
}

function registerSanitysEdge(this: void): undefined {
  const options = CRUTCH.savedOptions.sanitysedge
  CRUTCH.dbgOther("|c88FFFF[CT]|r Registered Sanity's Edge")

  CRUTCH.RegisterExitedGroupCombatListener("CrutchSanitysEdgeChimeraExitedCombat", cleanUp)

  if (options.infoPanel.showFrostBomb) {
    CRUTCH.RegisterForCombatEvent("SEFrostBomb", onFrostBomb, ACTION_RESULT_BEGIN, FROST_BOMB_ID)
    CRUTCH.RegisterForCombatEvent(
      "SEFrostBombDouble",
      onFrostBomb,
      ACTION_RESULT_BEGIN,
      FROST_BOMB_DOUBLE_ID
    )
  }

  if (options.showArcticShred) {
    onActivated()
  }

  if (options.showAnsuulIcon) {
    CRUTCH.EnableIcon("AnsuulCenter")
  }

  if (options.showChimeraIcons) {
    checkMantle()
  }

  if (options.infoPanel.showWrathstorm) {
    CRUTCH.RegisterForCombatEvent("SEWrathstorm", onWrathstorm, ACTION_RESULT_BEGIN, WRATHSTORM_ID)
    CRUTCH.RegisterForCombatEvent("SERitual", onRitual, ACTION_RESULT_BEGIN, 183855)
    CRUTCH.RegisterForCombatEvent(
      "SEBreakdownFaded",
      onBreakdownFaded,
      ACTION_RESULT_EFFECT_FADED,
      188760
    )
  }

  if (options.infoPanel.showCalamity) {
    CRUTCH.RegisterForCombatEvent("SECalamity", onCalamity, ACTION_RESULT_BEGIN, CALAMITY_ID)
    CRUTCH.RegisterForCombatEvent("SECalamityRitual", onCalamityRitual, ACTION_RESULT_BEGIN, 183855)
  }

  if (CRUTCH.savedOptions.bossHealthBar.enabled && options.showSplitHp) {
    CRUTCH.RegisterForCombatEvent(
      "SEBreakdownFadedSplits",
      untrackAll,
      ACTION_RESULT_EFFECT_FADED,
      188760
    )
    for (const [abilityId] of pairs(BREAKDOWN_DATA)) {
      CRUTCH.RegisterForCombatEvent(
        `SEBreakdownSplits${abilityId}`,
        onBreakdownSplits,
        ACTION_RESULT_EFFECT_GAINED,
        abilityId
      )
    }
  }

  if (options.showPoisonedMindIcons) {
    CRUTCH.RegisterForEffectChanged("SEPoisonedMind", onPoisonedMind, 184710, "group")
  }

  CRUTCH.RegisterForCombatEvent(
    "SEAttunement",
    onAttunement,
    ACTION_RESULT_EFFECT_GAINED,
    ATTUNEMENT_ID
  )
  CRUTCH.RegisterForCombatEvent(
    "SEUnattuned",
    onUnattuned,
    ACTION_RESULT_EFFECT_FADED,
    UNATTUNED_ID
  )
}

function unregisterSanitysEdge(this: void): undefined {
  CRUTCH.UnregisterExitedGroupCombatListener("CrutchSanitysEdgeChimeraExitedCombat")

  CRUTCH.UnregisterForCombatEvent("SEFrostBomb")
  CRUTCH.UnregisterForCombatEvent("SEFrostBombDouble")

  CRUTCH.DisableIcon("AnsuulCenter")

  disableChimeraIcons()

  CRUTCH.UnregisterForCombatEvent("SEArcticShred")
  CRUTCH.UnregisterForCombatEvent("SEChainLightning")

  CRUTCH.UnregisterForCombatEvent("SEWrathstorm")
  CRUTCH.UnregisterForCombatEvent("SERitual")
  CRUTCH.UnregisterForCombatEvent("SEBreakdownFaded")

  CRUTCH.UnregisterForCombatEvent("SECalamity")
  CRUTCH.UnregisterForCombatEvent("SECalamityRitual")

  CRUTCH.UnregisterForCombatEvent("SEBreakdownFadedSplits")
  for (const [abilityId] of pairs(BREAKDOWN_DATA)) {
    CRUTCH.UnregisterForCombatEvent(`SEBreakdownSplits${abilityId}`)
  }

  CRUTCH.UnregisterForEffectChanged("SEPoisonedMind")

  CRUTCH.UnregisterForCombatEvent("SEAttunement")
  CRUTCH.UnregisterForCombatEvent("SEUnattuned")

  cleanUp()

  CRUTCH.dbgOther("|c88FFFF[CT]|r Unregistered Sanity's Edge")
}

registerZone(1427, registerSanitysEdge, unregisterSanitysEdge)
