import type { RgbColor } from "akasha/temper/addon/pages/items/crafting-station/modules/craft-rune-crafting/craft-rune-crafting.module.code.ts"
import { CB_CONTROL_SHOW } from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-constants/crafting-constants.module.code.ts"
import { hideControl } from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-helpers/crafting-helpers.module.code.ts"
import { STATE } from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-state/crafting-state.module.code.ts"
import "akasha/temper/addon/pages/items/craft-decl-controls/craft-decl-controls.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-crafting-tooltips/eso-crafting-tooltips.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enchanting-station/eso-enchanting-station.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-02/eso-enums-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-06/eso-functions-06.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-provisioner-station/eso-provisioner-station.type-declaration.d.ts"

export function runeView(mode: number): undefined {
  const close = () => {
    TemperItemsCrafting_Rune.SetHidden(true)
    TemperItemsCrafting_RuneCloseButton.SetHidden(true)
    TemperItemsCrafting_RuneSpaceButton.SetHidden(false)
    TemperItemsCrafting_RuneCreateButton.SetHidden(false)
    TemperItemsCrafting_RuneRefineButton.SetHidden(false)
    TemperItemsCrafting_RuneFurnitureButton.SetHidden(false)
    TemperItemsCrafting_RuneHeader.SetWidth(308)
    TemperItemsCrafting_RuneSearch.SetWidth(150)
    TemperItemsCrafting_RuneSearchBG.SetWidth(160)
    TemperItemsCrafting_RuneInfo.SetHidden(false)
    TemperItemsCrafting_RuneAmount.SetHidden(false)
    TemperItemsCrafting_RuneAmountLabel.SetHidden(false)
    STATE.Extern = false
    const numChildren = TemperItemsCrafting_RuneGlyphSectionScrollChild.GetNumChildren()
    for (let x = 1; x <= numChildren; x++) {
      hideControl(`TemperItemsCrafting_RuneGlyphSectionScrollChildButton${x}`)
    }
  }

  if (ZO_EnchantingTopLevel.IsHidden()) {
    if (mode === 1 && TemperItemsCrafting_Rune.IsHidden()) {
      CALLBACK_MANAGER.FireCallbacks(CB_CONTROL_SHOW, TemperItemsCrafting_Rune)
      TemperItemsCrafting_RuneCloseButton.SetHidden(false)
      TemperItemsCrafting_RuneSpaceButton.SetHidden(true)
      TemperItemsCrafting_RuneCreateButton.SetHidden(true)
      TemperItemsCrafting_RuneRefineButton.SetHidden(true)
      TemperItemsCrafting_RuneFurnitureButton.SetHidden(true)
      TemperItemsCrafting_RuneHeader.SetWidth(532)
      TemperItemsCrafting_RuneSearch.SetWidth(290)
      TemperItemsCrafting_RuneSearchBG.SetWidth(300)
      TemperItemsCrafting_RuneInfo.SetHidden(true)
      TemperItemsCrafting_RuneAmount.SetHidden(true)
      TemperItemsCrafting_RuneAmountLabel.SetHidden(true)
      STATE.Extern = true
      STATE.Character.runemode = "craft"
      runeInitialize()
    } else {
      close()
    }
  }
}

export function runeHideVanillaUI(toggle: boolean): undefined {
  ZO_EnchantingTopLevelModeMenu.SetHidden(toggle)
  if (toggle) {
    ZO_EnchantingTopLevelInventory.SetHidden(toggle)
    ZO_EnchantingTopLevelModeMenu.SetHidden(toggle)
    ZO_EnchantingTopLevelTooltip.SetHidden(toggle)
    ZO_EnchantingTopLevelRuneSlotContainer.SetHidden(toggle)
    ZO_EnchantingTopLevelExtractionSlotContainer.SetHidden(toggle)
    ZO_ProvisionerTopLevel.SetHidden(toggle)
    ZO_ProvisionerTopLevelTooltip.SetHidden(toggle)
  }
  if (!IsInGamepadPreferredMode()) {
    ZO_KeybindStripControl.SetHidden(toggle)
  }
}

export function runeInitialize(toggle?: boolean): undefined {
  if (toggle === true || STATE.Extern) {
    STATE.Rune.aspectSkill = GetNonCombatBonus(NON_COMBAT_BONUS_ENCHANTING_RARITY_LEVEL)
    STATE.Rune.potencySkill = GetNonCombatBonus(NON_COMBAT_BONUS_ENCHANTING_LEVEL)
    const color: RgbColor = STATE.Quality[STATE.Character.aspect] ?? { 1: 0, 2: 0, 3: 0 }
    TemperItemsCrafting_RuneLevelButton.SetNormalFontColor(color[1], color[2], color[3], 1)
    TemperItemsCrafting_RuneAmount.SetText("")
    TemperItemsCrafting_RuneSearch.SetText(`${GetString(SI_GAMEPAD_HELP_SEARCH)}...`)
    TemperItemsCrafting_Rune.SetHidden(false)
  } else {
    TemperItemsCrafting_Rune.SetHidden(true)
  }
}
