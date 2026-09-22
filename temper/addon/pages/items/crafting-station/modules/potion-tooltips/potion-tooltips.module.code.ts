import { getPlayerSettings } from "akasha/temper/addon/pages/items/crafting-station/modules/potion-saved-variables/potion-saved-variables.module.code.ts"
import { PotMaker } from "akasha/temper/addon/pages/items/crafting-station/modules/potion-state/potion-state.module.code.ts"
import {
  addLineTitle,
  isScreenRightHalf,
} from "akasha/temper/addon/pages/items/crafting-station/modules/potion-tooltip-helpers/potion-tooltip-helpers.module.code.ts"
import type {
  Ingredient,
  Potion,
  Reagent,
} from "akasha/temper/addon/pages/items/crafting-station/modules/potion-types/potion-types.module.code.ts"
import "akasha/temper/addon/pages/items/crafting-station/potion-decl-controls/potion-decl-controls.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-alchemy-station/eso-alchemy-station.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-03/eso-enums-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-map-ui/eso-map-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-string-ids/eso-string-ids.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

interface TraitButton extends Control {
  Trait?: string
  trait?: { name: string }
  GetColor?: (this: void) => string | number
}

interface ReagentButton extends Control {
  reagent: Ingredient
}

interface PotionButton extends Control {
  potion: Potion
}

function asTraitButton(value: unknown): TraitButton {
  return value as TraitButton
}

function asReagentButton(value: unknown): ReagentButton {
  return value as ReagentButton
}

function asPotionButton(value: unknown): PotionButton {
  return value as PotionButton
}

function showTraitTip(this: void, resultButton: Control, state: boolean): undefined {
  if (state) {
    if (isScreenRightHalf(resultButton)) {
      InitializeTooltip(InformationTooltip, resultButton, TOPRIGHT, 0, 0, BOTTOMLEFT)
    } else {
      InitializeTooltip(InformationTooltip, resultButton, BOTTOMLEFT, 0, 0, TOPRIGHT)
    }
    const button = asTraitButton(resultButton)
    if (button.GetColor !== undefined) {
      SetTooltipText(InformationTooltip, button.Trait ?? "", button.GetColor() as number)
    } else {
      SetTooltipText(
        InformationTooltip,
        zo_strformat(SI_TOOLTIP_ITEM_NAME, button.trait?.name ?? ""),
        ZO_NORMAL_TEXT
      )
    }
  } else {
    ClearTooltip(InformationTooltip)
  }
}

PotMaker.showTraitTip = showTraitTip

function showReagentTip(this: void, sender: Control, state: boolean): undefined {
  if (!state) {
    ClearTooltip(ItemTooltip)
    ClearTooltip(TemperPotionsTooltip)
    return
  }

  const button = asReagentButton(sender)
  for (const p of button.reagent.pack) {
    const [, stack] = GetItemInfo(p.bagId, p.slotIndex)
    if (stack > 0) {
      if (isScreenRightHalf(sender)) {
        InitializeTooltip(ItemTooltip, sender, TOPRIGHT, -10, -96, TOPLEFT)
      } else {
        InitializeTooltip(ItemTooltip, sender, TOPLEFT, 10, -96, TOPRIGHT)
      }
      ItemTooltip.SetBagItem(p.bagId, p.slotIndex)
      return
    }
  }

  if (getPlayerSettings().useUnknown) {
    if (isScreenRightHalf(sender)) {
      InitializeTooltip(ItemTooltip, sender, TOPRIGHT, -10, -96, TOPLEFT)
    } else {
      InitializeTooltip(ItemTooltip, sender, TOPLEFT, 10, -96, TOPRIGHT)
    }
    const reagent: Reagent | undefined = PotMaker.allReagents[button.reagent.itemId]
    if (reagent?.itemLink !== undefined) {
      ItemTooltip.SetLink(reagent.itemLink)
    }
  } else {
    if (isScreenRightHalf(sender)) {
      InitializeTooltip(TemperPotionsTooltip, sender, TOPRIGHT, -10, -96, TOPLEFT)
    } else {
      InitializeTooltip(TemperPotionsTooltip, sender, TOPLEFT, 10, -96, TOPRIGHT)
    }
    ZO_ItemIconTooltip_OnAddGameData(
      TemperPotionsTooltip,
      TOOLTIP_GAME_DATA_ITEM_ICON,
      button.reagent.icon
    )
    const [headerR, headerG, headerB] = ZO_TOOLTIP_DEFAULT_COLOR.UnpackRGB()
    TemperPotionsTooltip.AddHeaderLine(
      zo_strformat(SI_ITEM_FORMAT_STR_TEXT1, GetString(SI_ITEMTYPE31)),
      "ZoFontWinT2",
      1,
      TOOLTIP_HEADER_SIDE_LEFT,
      headerR,
      headerG,
      headerB
    )
    TemperPotionsTooltip.AddHeaderLine(
      zo_strformat(SI_ITEM_FORMAT_STR_SPECIFIC_TYPE, GetString(SI_GAMEPADITEMCATEGORY0)),
      "ZoFontWinT2",
      2,
      TOOLTIP_HEADER_SIDE_LEFT,
      headerR,
      headerG,
      headerB
    )
    TemperPotionsTooltip.AddVerticalPadding(14)
    addLineTitle(
      TemperPotionsTooltip,
      zo_strformat(SI_TOOLTIP_ITEM_NAME, button.reagent.name),
      GetItemQualityColor(2)
    )
    TemperPotionsTooltip.AddVerticalPadding(-9)
    ZO_Tooltip_AddDivider(TemperPotionsTooltip)
  }
}

PotMaker.showReagentTip = showReagentTip

function showPotionTip(this: void, resultButton: Control, state: boolean): undefined {
  if (state) {
    const button = asPotionButton(resultButton)
    PotMaker.Potion.SetToolTip(button.potion, resultButton)
  } else {
    ClearTooltip(InformationTooltip)
    ClearTooltip(ItemTooltip)
  }
}

PotMaker.showPotionTip = showPotionTip
