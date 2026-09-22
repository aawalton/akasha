import { cookShow } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-cooking/craft-cooking.module.code.ts"
import { cookShowCategory } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-cooking-lists/craft-cooking-lists.module.code.ts"
import { defined } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-defined/craft-defined.module.code.ts"
import { updateBag } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-inventory/craft-inventory.module.code.ts"
import { inventorySpace } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-panel-init/craft-panel-init.module.code.ts"
import {
  updateResearch,
  updateResearchWindows,
} from "akasha/temper/addon/pages/items/crafting-station/modules/craft-research/craft-research.module.code.ts"
import type {
  RuneRefineGlyphEntry,
  RuneTable,
} from "akasha/temper/addon/pages/items/crafting-station/modules/craft-rune/craft-rune.module.code.ts"
import { getQuest } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-utilities/craft-utilities.module.code.ts"
import { hideControl } from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-helpers/crafting-helpers.module.code.ts"
import { STATE } from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-state/crafting-state.module.code.ts"
import { runeShowMode } from "akasha/temper/addon/pages/items/crafting-station/modules/rune-mode/rune-mode.module.code.ts"
import {
  runeHideVanillaUI,
  runeInitialize,
} from "akasha/temper/addon/pages/items/crafting-station/modules/rune-panel/rune-panel.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/craft-decl-controls/craft-decl-controls.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-alchemy-station/eso-alchemy-station.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-crafting-events/eso-crafting-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enchanting-station/eso-enchanting-station.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-02/eso-enums-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-11/eso-enums-11.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-12/eso-enums-12.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-05/eso-functions-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-06/eso-functions-06.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-provisioner-station/eso-provisioner-station.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"

type RuneJob = RuneTable["job"]
const asRuneJob = (value: { amount: number }): RuneJob => value as RuneJob

export function onCraftingStationInteract(
  this: void,
  _eventCode: number,
  craftSkill: number
): undefined {
  if (STATE.Account.options.usecook || STATE.Account.options.userune) {
    if (craftSkill === CRAFTING_TYPE_PROVISIONING || craftSkill === CRAFTING_TYPE_ENCHANTING) {
      STATE.Cook.craftLevel = GetNonCombatBonus(NON_COMBAT_BONUS_PROVISIONING_LEVEL)
      STATE.Cook.qualityLevel = GetNonCombatBonus(NON_COMBAT_BONUS_PROVISIONING_RARITY_LEVEL)
    }
  }
  if (STATE.Account.options.usecook && craftSkill === CRAFTING_TYPE_PROVISIONING) {
    cookShowCategory(STATE.Character.recipe)
    cookShow()
    inventorySpace(TemperItemsCrafting_CookSpaceButtonName)

    if (!STATE.Cook.hooksInitialized && !IsInGamepadPreferredMode()) {
      if (ZO_ProvisionerTopLevelTabsButton2 !== undefined) {
        ZO_PreHookHandler(ZO_ProvisionerTopLevelTabsButton2, "OnMouseDown", cookFoodTabShow)
      } else {
        d("[TemperItemsCrafting] ERROR: ZO_ProvisionerTopLevelTabsButton2 no existe.")
      }

      if (ZO_ProvisionerTopLevelTabsButton3 !== undefined) {
        ZO_PreHookHandler(ZO_ProvisionerTopLevelTabsButton3, "OnMouseDown", cookDrinkTabShow)
      } else {
        d("[TemperItemsCrafting] ERROR: ZO_ProvisionerTopLevelTabsButton3 no existe.")
      }

      if (ZO_ProvisionerTopLevelTabsButton4 !== undefined) {
        ZO_PreHookHandler(ZO_ProvisionerTopLevelTabsButton4, "OnMouseDown", cookFurnitureTabShow)
      } else {
        d("[TemperItemsCrafting] ERROR: ZO_ProvisionerTopLevelTabsButton4 no existe.")
      }

      STATE.Cook.hooksInitialized = true
    }
  }
  if (STATE.Account.options.userune && craftSkill === CRAFTING_TYPE_ENCHANTING) {
    STATE.Extern = false
    let useCSRune = true
    if (
      (!STATE.Account.options.userunecreation && STATE.Character.runemode === "craft") ||
      (!STATE.Account.options.useruneextraction && STATE.Character.runemode === "refine") ||
      (!STATE.Account.options.userunerecipe && STATE.Character.runemode === "furniture")
    ) {
      useCSRune = false
    }
    runeInitialize(useCSRune)
    runeHideVanillaUI(useCSRune)
    runeShowMode()
    const soundPlayer = CRAFTING_RESULTS.enchantSoundPlayer
    soundPlayer.PlaySound = function (this: void) {
      return
    }
    inventorySpace(TemperItemsCrafting_RuneSpaceButtonName)
  }
  if (STATE.Account.options.usequest) {
    getQuest()
    const quest = STATE.Quest[craftSkill]
    if (quest !== undefined) {
      const title = quest.name + "\n"
      let out = ""
      for (const [, step] of pairs(quest.work)) {
        out = out + step + "\n"
      }
      if (STATE.Quest[craftSkill] !== undefined) {
        TemperItemsCrafting_QuestText.SetText(title + out)
        TemperItemsCrafting_Quest.SetHidden(false)
      }
    }
  }
  if (
    craftSkill === CRAFTING_TYPE_BLACKSMITHING ||
    craftSkill === CRAFTING_TYPE_CLOTHIER ||
    craftSkill === CRAFTING_TYPE_WOODWORKING ||
    craftSkill === CRAFTING_TYPE_JEWELRYCRAFTING
  ) {
    updateResearch()
    updateResearchWindows()
  }
}

export function onCraftCompleted(this: void, _eventCode: number, craftSkill: number): undefined {
  const inspirationGained = GetLastCraftingResultTotalInspiration()
  if (inspirationGained > 0) {
    STATE.Inspiration = `|t30:30:/esoui/art/currency/currency_inspiration.dds|t |c9095FF${inspirationGained}|r`
  }
  if (STATE.Account.options.usecook && craftSkill === CRAFTING_TYPE_PROVISIONING) {
    TemperItemsCrafting_CookAmount.SetText("")
    zo_callLater(() => {
      cookShowCategory(STATE.Character.recipe, false)
    }, 500)
    inventorySpace(TemperItemsCrafting_CookSpaceButtonName)
  }
  if (STATE.Account.options.userune && craftSkill === CRAFTING_TYPE_ENCHANTING) {
    TemperItemsCrafting_RuneAmount.SetText("")
    const glyphs = STATE.Rune.refine.glyphs
    if (glyphs[0] !== undefined) {
      let remove = true
      while (remove) {
        const first = glyphs[0]
        if (first?.crafted === true && !STATE.Rune.refine.crafted) {
          glyphs.shift()
        } else {
          remove = false
        }
      }
      const head = glyphs[0]
      if (head !== undefined) {
        if (
          GetNumBagFreeSlots(BAG_BACKPACK) >= 3 ||
          (tonumber(GetSetting(SETTING_TYPE_LOOT, LOOT_SETTING_AUTO_ADD_TO_CRAFT_BAG)) === 1 &&
            IsESOPlusSubscriber())
        ) {
          ExtractEnchantingItem(defined(head.location[0])[0], defined(head.location[0])[1])
          PlaySound("Enchanting_Extract_Start_Anim")
          if (head.location.length === 1) {
            glyphs.shift()
          } else {
            head.location.shift()
          }
        } else {
          STATE.Chat.Print(STATE.Loc.nobagspace)
        }
      }
    }
    inventorySpace(TemperItemsCrafting_RuneSpaceButtonName)
    zo_callLater(() => {
      runeShowMode(true)
    }, 500)
  }
  updateBag()
}

export function onEndCraftingStationInteract(
  this: void,
  _eventCode: number,
  craftSkill: number
): undefined {
  TemperItemsCrafting_Quest.SetHidden(true)
  STATE.UIClosed = true

  if (STATE.Account.options.usecook && craftSkill === CRAFTING_TYPE_PROVISIONING) {
    TemperItemsCrafting_Cook.SetHidden(true)
    const numProvisionerChildren = ZO_ProvisionerTopLevel.GetNumChildren()
    for (let x = 2; x <= numProvisionerChildren; x++) {
      const child = ZO_ProvisionerTopLevel.GetChild(x)
      if (child !== undefined) {
        child.SetAlpha(1)
      }
    }
    STATE.Cook.job = { amount: 0, list: undefined, id: undefined }
    const numCookChildren = TemperItemsCrafting_CookFoodSectionScrollChild.GetNumChildren()
    for (let x = 1; x <= numCookChildren; x++) {
      hideControl(`TemperItemsCrafting_CookFoodSectionScrollChildButton${x}`)
    }
  }
  if (STATE.Account.options.userune && craftSkill === CRAFTING_TYPE_ENCHANTING) {
    TemperItemsCrafting_Rune.SetHidden(true)
    STATE.Extern = true
    const glyphs: Record<number, RuneRefineGlyphEntry | undefined> = STATE.Rune.refine.glyphs
    for (const [k] of pairs(glyphs)) {
      glyphs[k] = undefined
    }
    const numEnchantingChildren = ZO_EnchantingTopLevel.GetNumChildren()
    for (let x = 2; x <= numEnchantingChildren; x++) {
      const child = ZO_EnchantingTopLevel.GetChild(x)
      if (child !== undefined) {
        child.SetHidden(false)
      }
    }
    STATE.Rune.job = asRuneJob({ amount: 0 })
    const numRuneChildren = TemperItemsCrafting_RuneGlyphSectionScrollChild.GetNumChildren()
    for (let x = 1; x <= numRuneChildren; x++) {
      hideControl(`TemperItemsCrafting_RuneGlyphSectionScrollChildButton${x}`)
    }
  }
}

export function runeCreationTabShow(this: void): undefined {
  STATE.Character.runemode = "craft"
  if (STATE.Account.options.userune && STATE.Account.options.userunecreation) {
    runeShowMode()
  }
}

export function runeExtractionTabShow(this: void): undefined {
  STATE.Character.runemode = "refine"
  if (STATE.Account.options.userune && STATE.Account.options.useruneextraction) {
    runeShowMode()
  }
}

export function runeRecipeTabShow(this: void): undefined {
  STATE.Character.runemode = "furniture"
  if (STATE.Account.options.userune) {
    runeShowMode()
  }
}

function cookFoodTabShow(this: void): undefined {
  if (STATE.Account.options.usecook) {
    cookShowCategory(1)
    cookShow()
  }
}

function cookDrinkTabShow(this: void): undefined {
  if (STATE.Account.options.usecook) {
    cookShowCategory(8)
    cookShow()
  }
}

function cookFurnitureTabShow(this: void): undefined {
  if (STATE.Account.options.usecook) {
    cookShowCategory(19)
    cookShow()
  }
}
