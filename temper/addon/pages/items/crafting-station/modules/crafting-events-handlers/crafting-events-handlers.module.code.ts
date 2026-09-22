import { blueprintLearned } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-blueprint-furnisher/craft-blueprint-furnisher.module.code.ts"
import { characterInitialize } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-character-panel-init/craft-character-panel-init.module.code.ts"
import { defined } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-defined/craft-defined.module.code.ts"
import { updateBag } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-inventory/craft-inventory.module.code.ts"
import { migrateJewelryIdSwap } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-mig-jewelry-swap/craft-mig-jewelry-swap.module.code.ts"
import { migrateStoragePrune } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-mig-storage-prune/craft-mig-storage-prune.module.code.ts"
import { migrateStudiesShape } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-mig-studies-shape/craft-mig-studies-shape.module.code.ts"
import {
  updateAccountVars,
  updateInventory,
  updatePlayer,
  updateRecipeKnowledge,
} from "akasha/temper/addon/pages/items/crafting-station/modules/craft-player-state/craft-player-state.module.code.ts"
import { updateQuest } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-quest-tracking/craft-quest-tracking.module.code.ts"
import { getTimer } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-queue/craft-queue.module.code.ts"
import { recipeLearned } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-recipe-cooking/craft-recipe-cooking.module.code.ts"
import {
  updateAllStudies,
  updateResearch,
  updateResearchWindows,
} from "akasha/temper/addon/pages/items/crafting-station/modules/craft-research/craft-research.module.code.ts"
import { updatePanelIcon } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-research-trait-icon/craft-research-trait-icon.module.code.ts"
import {
  hideCrownStyles,
  hideKnownBlueprints,
  hideKnownRecipes,
  hidePerfectedStyles,
  hideStyles,
  hideUnknownBlueprints,
  hideUnknownRecipes,
  hideUnknownStyles,
  updateStyleKnowledge,
} from "akasha/temper/addon/pages/items/crafting-station/modules/craft-style-tracking/craft-style-tracking.module.code.ts"
import {
  controlCloseAll,
  initPreviews,
} from "akasha/temper/addon/pages/items/crafting-station/modules/craft-ui-updates/craft-ui-updates.module.code.ts"
import { STATE } from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-state/crafting-state.module.code.ts"
import { runeView } from "akasha/temper/addon/pages/items/crafting-station/modules/rune-panel/rune-panel.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/craft-decl-controls/craft-decl-controls.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-chat/eso-chat.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-crafting-tooltips/eso-crafting-tooltips.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-06/eso-functions-06.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

export function onQuestConditionCounterChanged(
  this: void,
  _eventCode: number,
  journalIndex: number
): undefined {
  updateQuest(journalIndex)
}

export function onRecipeLearned(
  this: void,
  _eventCode: number,
  list: number,
  id: number
): undefined {
  recipeLearned(list, id)
  blueprintLearned(list, id)
}

export function onStyleLearned(
  this: void,
  _eventCode: number,
  _styleIndex: number,
  _chapterIndex: number,
  _isDefaultRacialStyle: boolean
): undefined {
  updateStyleKnowledge(true)
}

export function onSmithingTraitResearchStarted(
  this: void,
  _eventCode: number,
  craft: number,
  line: number,
  trait: number
): undefined {
  const [, remaining] = GetSmithingResearchLineTraitTimes(craft, line, trait)
  if (remaining !== undefined) {
    defined(defined(defined(STATE.Data.crafting.researched[STATE.CurrentPlayer])[craft])[line])[
      trait
    ] = remaining + GetTimeStamp()
  }
  defined(defined(STATE.Account.crafting.stored[craft])[line])[trait] = {}
  updateResearchWindows()
  updatePanelIcon(craft, line, trait)
  getTimer()
}

export function onSmithingTraitResearchChange(
  this: void,
  _eventCode: number,
  _craft: number,
  _line: number,
  _trait: number
): undefined {
  updateResearch()
  updateResearchWindows()
}

export function onStableInteractEnd(this: void, _eventCode: number): undefined {
  getTimer()
}

export function onGameCameraUIModeChanged(this: void, _eventCode: number): undefined {
  if (STATE.UIClosed) {
    STATE.UIClosed = false
  }
}

export function onActionLayerPushed(
  this: void,
  _eventCode: number,
  _layerIndex: number,
  _activeLayerIndex: number
): undefined {
  if (STATE.UIClosed) {
    ZO_KeybindStripControl.SetHidden(false)
    STATE.UIClosed = false
  }
}

export function newMovementInUIMode(this: void, _eventCode: number): undefined {
  if (STATE.Account.options.closeonmove && !TemperItemsCrafting_Panel.IsHidden()) {
    controlCloseAll()
  }
}

export function onReticleHiddenUpdate(this: void, _eventCode: number, hidden: boolean): undefined {
  if (!hidden && !TemperItemsCrafting_Rune.IsHidden()) {
    runeView(2)
  }
}

export function onPlayerActivated(this: void, _eventCode: number, _initial: boolean): undefined {
  if (STATE.Debug) {
    zo_callLater(() => {
      CHAT_ROUTER.AddSystemMessage(
        "CS.Account.crafting.jewelryIdSwapMigrationAlreadyDoneDone: " +
          tostring(STATE.Account.crafting.jewelryIdSwapMigrationAlreadyDoneDone)
      )
    }, 50)
  }
  if (STATE.Account.crafting.jewelryIdSwapMigrationAlreadyDoneDone !== true) {
    zo_callLater(() => {
      CHAT_ROUTER.AddSystemMessage(
        "[TemperItemsCrafting] The internal indices of the game for jewelry (rings and necklaces) got swapped by ZOS. TemperItemsCrafting need to migrate its SavedVariables once. Starting..."
      )
    }, 50)
    migrateJewelryIdSwap()
    STATE.Account.crafting.jewelryIdSwapMigrationAlreadyDoneDone = true
    zo_callLater(() => {
      CHAT_ROUTER.AddSystemMessage(
        "[TemperItemsCrafting] Migration of TemperItemsCrafting's SavedVariables finished."
      )
    }, 50)
  }

  migrateStudiesShape()
  migrateStoragePrune()
  updateAccountVars()
  updatePlayer()
  updateStyleKnowledge(true)
  updateRecipeKnowledge()
  updateAllStudies()
  updateInventory()
  characterInitialize()
  getTimer()
  initPreviews()
  updateResearch()
  updateResearchWindows()
  updateBag()
  hideStyles(true)
  hideCrownStyles(true)
  hidePerfectedStyles(true)
  hideUnknownStyles(true)
  hideKnownBlueprints(true)
  hideUnknownBlueprints(true)
  hideKnownRecipes(true)
  hideUnknownRecipes(true)
  STATE.Init = true
  EVENT_MANAGER.UnregisterForEvent("TemperItemsCrafting_Events", EVENT_PLAYER_ACTIVATED)
}

export function onPlayerDeactivated(this: void, _eventCode: number): undefined {
  updatePlayer(true)
  EVENT_MANAGER.UnregisterForEvent("TemperItemsCrafting_Events", EVENT_PLAYER_DEACTIVATED)
}

export function onChampionPerksSceneStateChange(
  this: void,
  _oldState: number,
  newState: number
): undefined {
  if (newState === SCENE_SHOWING) {
    controlCloseAll()
    TemperItemsCrafting_ButtonFrame.SetHidden(true)
  } else if (newState === SCENE_HIDDEN) {
    if (STATE.Account.options.showbutton) {
      TemperItemsCrafting_ButtonFrame.SetHidden(false)
    }
  }
}
