import { ACCOUNT_INIT } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-account-init/craft-account-init.module.code.ts"
import type { CharacterData } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-char-init/craft-char-init.module.code.ts"
import { CHAR_INIT } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-char-init/craft-char-init.module.code.ts"
import {
  drawCharacters,
  removeCharacter,
} from "akasha/temper/addon/pages/items/crafting-station/modules/craft-character-panel/craft-character-panel.module.code.ts"
import { CRAFTING } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-crafting/craft-crafting.module.code.ts"
import {
  storagePurge,
  updateBag,
} from "akasha/temper/addon/pages/items/crafting-station/modules/craft-inventory/craft-inventory.module.code.ts"
import * as Knowledge from "akasha/temper/addon/pages/items/crafting-station/modules/craft-knowledge/craft-knowledge.module.code.ts"
import {
  inventorySpace,
  panelInitialize,
} from "akasha/temper/addon/pages/items/crafting-station/modules/craft-panel-init/craft-panel-init.module.code.ts"
import {
  repairStored,
  updateGuildStore,
  updatePlayer,
  updateRecipeKnowledge,
} from "akasha/temper/addon/pages/items/crafting-station/modules/craft-player-state/craft-player-state.module.code.ts"
import {
  queue,
  scrollText,
} from "akasha/temper/addon/pages/items/crafting-station/modules/craft-queue/craft-queue.module.code.ts"
import {
  addResearchItem,
  updateResearch,
} from "akasha/temper/addon/pages/items/crafting-station/modules/craft-research/craft-research.module.code.ts"
import { updatePanelIcon } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-research-trait-icon/craft-research-trait-icon.module.code.ts"
import { registerSettings } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-set-lam/craft-set-lam.module.code.ts"
import { styleApi } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-styles-data/craft-styles-data.module.code.ts"
import { tooltipHandler } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-tooltip-handler/craft-tooltip-handler.module.code.ts"
import {
  controlShow,
  showMain,
  updateScreen,
} from "akasha/temper/addon/pages/items/crafting-station/modules/craft-ui-updates/craft-ui-updates.module.code.ts"
import {
  CB_ADD_RESEARCH_ITEM,
  CB_CONTROL_SHOW,
  CB_INVENTORY_SPACE,
  CB_UPDATE_PANEL_ICON,
  CB_UPDATE_PLAYER,
} from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-constants/crafting-constants.module.code.ts"
import {
  newMovementInUIMode,
  onActionLayerPushed,
  onChampionPerksSceneStateChange,
  onGameCameraUIModeChanged,
  onPlayerActivated,
  onPlayerDeactivated,
  onQuestConditionCounterChanged,
  onRecipeLearned,
  onReticleHiddenUpdate,
  onSmithingTraitResearchChange,
  onSmithingTraitResearchStarted,
  onStableInteractEnd,
  onStyleLearned,
} from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-events-handlers/crafting-events-handlers.module.code.ts"
import {
  onCraftCompleted,
  onCraftingStationInteract,
  onEndCraftingStationInteract,
  runeCreationTabShow,
  runeExtractionTabShow,
  runeRecipeTabShow,
} from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-events-handlers-station/crafting-events-handlers-station.module.code.ts"
import {
  onInventorySingleSlotUpdate,
  onInventorySlotAdded,
  onInventorySlotRemoved,
  onMoneyUpdate,
  onStackSplitShow,
} from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-events-inventory/crafting-events-inventory.module.code.ts"
import { filterPublishedItems } from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-helpers/crafting-helpers.module.code.ts"
import { TEMPER_ITEMS_CRAFTING_API } from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-public-api/crafting-public-api.module.code.ts"
import { timed } from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-slot-handler-stats/crafting-slot-handler-stats.module.code.ts"
import { STATE } from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-state/crafting-state.module.code.ts"
import { initializeTemperPotions } from "akasha/temper/addon/pages/items/crafting-station/modules/potion-init/potion-init.module.code.ts"
import { initializeTemperWrit } from "akasha/temper/addon/pages/items/crafting-station/modules/writ-init/writ-init.module.code.ts"
import { initializeMasterWritInventoryMarker } from "akasha/temper/addon/pages/items/crafting-station/modules/writ-mark-init/writ-mark-init.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/craft-decl-controls/craft-decl-controls.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-crafting-events/eso-crafting-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-world-map-pins/eso-world-map-pins.type-declaration.d.ts"
import "akasha/temper/addon/type/temper-hud-global/temper-hud-global.type-declaration.d.ts"

export function onAddOnLoaded(this: void): undefined {
  CALLBACK_MANAGER.RegisterCallback(CB_UPDATE_PLAYER, updatePlayer)
  CALLBACK_MANAGER.RegisterCallback(CB_ADD_RESEARCH_ITEM, addResearchItem)
  CALLBACK_MANAGER.RegisterCallback(CB_UPDATE_PANEL_ICON, updatePanelIcon)
  CALLBACK_MANAGER.RegisterCallback(CB_CONTROL_SHOW, controlShow)
  CALLBACK_MANAGER.RegisterCallback(CB_INVENTORY_SPACE, inventorySpace)

  const style = styleApi()
  STATE.Style = style
  style.RemoveUnpublishedStyles()
  style.compileStyles()
  style.compilePartialStyles({ 114: true, 119: true })
  CRAFTING.CompileTraits()
  STATE.Account = ZO_SavedVars.NewAccountWide(
    "TemperCrafting_Account",
    3,
    GetWorldName(),
    ACCOUNT_INIT
  )
  STATE.Character = ZO_SavedVars.NewCharacterIdSettings<CharacterData>(
    "TemperCrafting_Character",
    2,
    GetWorldName(),
    CHAR_INIT
  )
  TEMPER_ITEMS_CRAFTING_API.Account = STATE.Account
  TEMPER_ITEMS_CRAFTING_API.Character = STATE.Character

  EVENT_MANAGER.RegisterForUpdate("TemperItemsCrafting", 1000, queue)

  STATE.Furnisher.recipelist = filterPublishedItems(STATE.Furnisher.recipelist)

  const craftingVars: Record<string, unknown> = STATE.Account.crafting
  delete craftingVars["research"]
  delete craftingVars["researched"]
  delete craftingVars["researching"]

  if (STATE.Character.income[1] !== GetDate()) {
    STATE.Character.income[1] = GetDate()
    STATE.Character.income[2] = GetCurrentMoney()
  }

  ZO_CreateStringId("SI_BINDING_NAME_CRAFTSTORE_WINDOW", STATE.Loc.TT[14])

  ZO_CreateStringId("SI_BINDING_NAME_CRAFTSTORE_STYLES", STATE.Loc.TT[35])
  ZO_CreateStringId("SI_BINDING_NAME_CRAFTSTORE_RUNES", STATE.Loc.TT[36])
  ZO_CreateStringId("SI_BINDING_NAME_CRAFTSTORE_PROVISIONING", STATE.Loc.TT[37])
  ZO_CreateStringId("SI_BINDING_NAME_CRAFTSTORE_FURNISHINGS", STATE.Loc.TT[38])

  SCENE_MANAGER.RegisterTopLevel(TemperItemsCrafting_Panel, false)
  EVENT_MANAGER.RegisterForEvent(
    "CSEE",
    EVENT_QUEST_CONDITION_COUNTER_CHANGED,
    onQuestConditionCounterChanged
  )
  EVENT_MANAGER.RegisterForEvent("CSEE", EVENT_RECIPE_LEARNED, onRecipeLearned)
  EVENT_MANAGER.RegisterForEvent("CSEE", EVENT_STYLE_LEARNED, onStyleLearned)
  EVENT_MANAGER.RegisterForEvent("CSEE", EVENT_TRADING_HOUSE_RESPONSE_RECEIVED, updateGuildStore)
  EVENT_MANAGER.RegisterForEvent(
    "CSEE",
    EVENT_SMITHING_TRAIT_RESEARCH_STARTED,
    onSmithingTraitResearchStarted
  )
  EVENT_MANAGER.RegisterForEvent("CSEE", EVENT_STABLE_INTERACT_END, onStableInteractEnd)
  EVENT_MANAGER.RegisterForEvent(
    "CSEE",
    EVENT_SMITHING_TRAIT_RESEARCH_COMPLETED,
    onSmithingTraitResearchChange
  )
  EVENT_MANAGER.RegisterForEvent(
    "CSEE",
    EVENT_SMITHING_TRAIT_RESEARCH_CANCELED,
    onSmithingTraitResearchChange
  )
  EVENT_MANAGER.RegisterForEvent("CSEE", EVENT_CRAFTING_STATION_INTERACT, onCraftingStationInteract)
  EVENT_MANAGER.RegisterForEvent("CSEE", EVENT_INVENTORY_FULL_UPDATE, updateBag)
  EVENT_MANAGER.RegisterForEvent("CSEE", EVENT_CRAFT_COMPLETED, onCraftCompleted)
  EVENT_MANAGER.RegisterForEvent(
    "CSEE",
    EVENT_END_CRAFTING_STATION_INTERACT,
    onEndCraftingStationInteract
  )
  EVENT_MANAGER.RegisterForEvent(
    "CSEE",
    EVENT_GAME_CAMERA_UI_MODE_CHANGED,
    onGameCameraUIModeChanged
  )
  EVENT_MANAGER.RegisterForEvent("CSEE", EVENT_ACTION_LAYER_PUSHED, onActionLayerPushed)
  EVENT_MANAGER.RegisterForEvent("CSEE", EVENT_NEW_MOVEMENT_IN_UI_MODE, newMovementInUIMode)
  EVENT_MANAGER.RegisterForEvent("CSEE", EVENT_RETICLE_HIDDEN_UPDATE, onReticleHiddenUpdate)
  EVENT_MANAGER.RegisterForEvent("CSEE", EVENT_PLAYER_ACTIVATED, onPlayerActivated)
  EVENT_MANAGER.RegisterForEvent("CSEE", EVENT_PLAYER_DEACTIVATED, onPlayerDeactivated)
  EVENT_MANAGER.RegisterForEvent(
    "CSEE",
    EVENT_INVENTORY_SINGLE_SLOT_UPDATE,
    timed(onInventorySingleSlotUpdate)
  )
  EVENT_MANAGER.RegisterForEvent("CSEE", EVENT_MONEY_UPDATE, onMoneyUpdate)

  CHAMPION_PERKS_SCENE.RegisterCallback("StateChange", onChampionPerksSceneStateChange)

  SHARED_INVENTORY.RegisterCallback("SlotAdded", timed(onInventorySlotAdded))
  SHARED_INVENTORY.RegisterCallback("SlotRemoved", timed(onInventorySlotRemoved))
  ZO_PreHookHandler(ZO_StackSplit, "OnShow", onStackSplitShow)
  ZO_PreHookHandler(ZO_EnchantingTopLevelModeMenuBarButton1, "OnMouseDown", runeCreationTabShow)
  ZO_PreHookHandler(ZO_EnchantingTopLevelModeMenuBarButton2, "OnMouseDown", runeExtractionTabShow)
  ZO_PreHookHandler(ZO_EnchantingTopLevelModeMenuBarButton3, "OnMouseDown", runeRecipeTabShow)

  STATE.settingsPanel = registerSettings()
  TEMPER_ITEMS_CRAFTING_API.LAM = STATE.settingsPanel

  scrollText()
  tooltipHandler()
  if (
    type(STATE.Character.previewtype) === "string" ||
    STATE.Character.previewType === undefined ||
    STATE.Character.previewType === false
  ) {
    STATE.Character.previewtype = 1
  }
  style.updatePreview(STATE.Character.previewtype)
  panelInitialize()

  Knowledge.onInitialized("TemperItemsCrafting", () => {
    if (STATE.Init) {
      Knowledge.rebuildAll()
      updateResearch()
      updateScreen()
      drawCharacters()
    }
  })

  initializeTemperWrit()
  initializeTemperPotions()
  Knowledge.onInitialized("TemperMasterWritInventoryMarker", () => {
    initializeMasterWritInventoryMarker()
  })
}

if (STATE.Debug) {
  _CS = STATE
  SLASH_COMMANDS["//"] =
    SLASH_COMMANDS["/reloadui"] ?? error("TemperItemsCrafting: missing /reloadui")
  SLASH_COMMANDS["/langfr"] = () => {
    SetCVar("language.2", "fr")
  }
  SLASH_COMMANDS["/langen"] = () => {
    SetCVar("language.2", "en")
  }
  SLASH_COMMANDS["/langde"] = () => {
    SetCVar("language.2", "de")
  }
  SLASH_COMMANDS["/langru"] = () => {
    SetCVar("language.2", "ru")
  }
}

SLASH_COMMANDS["/tempercraft"] = showMain
SLASH_COMMANDS["/tc"] = showMain
SLASH_COMMANDS["/tcpurge"] = storagePurge
SLASH_COMMANDS["/tcrepair"] = repairStored
SLASH_COMMANDS["/tcrepairknowledge"] = updateRecipeKnowledge
SLASH_COMMANDS["/tcremovechar"] = removeCharacter

globalThis.TemperHud?.registerCommand({
  name: "/tempercraft",
  description: "Crafting storage & research window",
  addon: "TemperItems",
})
