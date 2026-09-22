import { asBoolean } from "akasha/temper/addon/pages/items/crafting-station/modules/potion-casts/potion-casts.module.code.ts"
import {
  COLOR_SELECT,
  TEXTURE_BAG,
  TEXTURE_BANK,
} from "akasha/temper/addon/pages/items/crafting-station/modules/potion-constants/potion-constants.module.code.ts"
import { getSavedFavorites } from "akasha/temper/addon/pages/items/crafting-station/modules/potion-saved-variables/potion-saved-variables.module.code.ts"
import { PotMaker } from "akasha/temper/addon/pages/items/crafting-station/modules/potion-state/potion-state.module.code.ts"
import { clearTooltips } from "akasha/temper/addon/pages/items/crafting-station/modules/potion-tooltip-helpers/potion-tooltip-helpers.module.code.ts"
import type { Potion } from "akasha/temper/addon/pages/items/crafting-station/modules/potion-types/potion-types.module.code.ts"
import {
  clearInventory,
  clearResultList,
} from "akasha/temper/addon/pages/items/crafting-station/modules/potion-window-helpers/potion-window-helpers.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/craft-decl-controls/craft-decl-controls.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/crafting-station/potion-decl-controls/potion-decl-controls.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-addon-screen/eso-addon-screen.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-alchemy-station/eso-alchemy-station.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-4/eso-interface-extra-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-map-ui/eso-map-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-string-ids/eso-string-ids.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"

interface HighlightLabelControl extends LabelControl {
  defaultHighlightColor?: ZoColorDef
}

type ControlHandler = (this: void, ...args: unknown[]) => undefined

function asButtonControl(value: unknown): ButtonControl {
  return value as ButtonControl
}

function asControlHandler(value: unknown): ControlHandler {
  return value as ControlHandler
}

function asHighlightLabelControl(value: unknown): HighlightLabelControl {
  return value as HighlightLabelControl
}

function close(this: void): undefined {
  clearInventory()
  ClearMenu()
  clearTooltips()
  clearResultList()
  collectgarbage()
}
PotMaker.close = close

function setSelected(this: void, potion: Potion): undefined {
  PotMaker.selected = potion
  const hidden = potion.itemLink === ""
  const favoriteButton = asButtonControl(TemperPotionsOutputFavorite)
  favoriteButton.SetHidden(hidden)
  if (!hidden) {
    if (getSavedFavorites()[potion.itemId] !== undefined) {
      favoriteButton.SetText(PotMaker.language.unmark_favorite)
    } else {
      favoriteButton.SetText(PotMaker.language.mark_favorite)
    }
  }
}
PotMaker.SetSelected = setSelected

function toggleFavorite(this: void): undefined {
  const potion = PotMaker.selected
  if (potion === undefined) {
    return
  }
  const favorites = getSavedFavorites()
  if (favorites[potion.itemId] !== undefined) {
    delete favorites[potion.itemId]
  } else {
    favorites[potion.itemId] = {
      samePotion: asBoolean(potion.samePotionId),
      sameTraits: asBoolean(potion.sameTraitsId),
    }
  }
  PotMaker.initFavorites()
  PotMaker.RenderPage()
  PotMaker.SetSelected(potion)
}
PotMaker.ToggleFavorite = toggleFavorite

function initWindows(this: void): undefined {
  TemperPotionsBagButtonTexture.SetTexture(TEXTURE_BAG)
  TemperPotionsBagButtonTexture.SetMouseEnabled(true)
  TemperPotionsBagButtonTexture.SetHandler("OnMouseUp", asControlHandler(PotMaker.toggleBag))
  TemperPotionsBankButtonTexture.SetTexture(TEXTURE_BANK)
  TemperPotionsBankButtonTexture.SetMouseEnabled(true)
  TemperPotionsBankButtonTexture.SetHandler("OnMouseUp", asControlHandler(PotMaker.toggleBank))

  TemperPotionsOutput.title = TemperPotionsLabel
  TemperPotionsOutputCombinationLabel.SetText(PotMaker.language.combinations)
  TemperPotionsOutputTraitLabel.SetText(GetString(SI_CRAFTING_COMPONENT_TOOLTIP_TRAITS))

  TemperPotionsTopLevel.SetHidden(true)

  TemperPotionsSearchButton.SetText(PotMaker.language.search)
  TemperPotionsSearchButton.SetHandler("OnClicked", PotMaker.startSearch)
  TemperPotionsOutputSearchButton.SetText(PotMaker.language.search_again)
  TemperPotionsOutputSearchButton.SetHandler("OnClicked", PotMaker.searchAgain)
  TemperPotionsTraitLabel1.SetText(GetString(SI_CRAFTING_COMPONENT_TOOLTIP_TRAITS))
  TemperPotionsTraitLabel2.SetText(GetString(SI_CRAFTING_COMPONENT_TOOLTIP_TRAITS))
  TemperPotionsSolventLabel.SetText(GetString(SI_ALCHEMY_SOLVENT_HEADER))
  TemperPotionsReagentLabel.SetText(GetString(SI_ALCHEMY_REAGENTS_HEADER))

  const onlyReagentText = asHighlightLabelControl(TemperPotionsOnlyReagentText)
  onlyReagentText.SetText(PotMaker.language.only)
  onlyReagentText.defaultHighlightColor = COLOR_SELECT
  ZO_CheckButton_SetToggleFunction(TemperPotionsOnlyReagent, PotMaker.checkButtonClicked)

  const only2Text = asHighlightLabelControl(TemperPotionsOnly2Text)
  only2Text.SetText(PotMaker.language.potion2reagents)
  only2Text.defaultHighlightColor = COLOR_SELECT
  ZO_CheckButton_SetToggleFunction(TemperPotionsOnly2, PotMaker.checkButtonClicked)

  TemperPotionsQuestWrits.SetHandler("OnClicked", PotMaker.findWrits)

  TemperPotionsTooltip.SetParent(PopupTooltipTopLevel)
  TemperPotionsOutputNextButton.SetHandler("OnClicked", PotMaker.next)
  TemperPotionsOutputPreviousButton.SetHandler("OnClicked", PotMaker.previous)

  const favorites = asButtonControl(TemperPotionsFavorites)
  favorites.SetText(PotMaker.language.favorites)
  favorites.SetHandler("OnClicked", PotMaker.findFavorites)
  const favoriteControl = asButtonControl(TemperPotionsOutputFavorite)
  favoriteControl.SetText(PotMaker.language.mark_favorite)
  favoriteControl.SetHandler("OnClicked", () => {
    PotMaker.ToggleFavorite()
  })
  favoriteControl.SetHidden(true)

  TemperPotionsClearFilter.SetHandler("OnClicked", PotMaker.ClearFilter)
  TemperPotionsClearFilter.SetHandler(
    "OnMouseEnter",
    asControlHandler((control: Control) => {
      InitializeTooltip(InformationTooltip, control, TOP, 0, 5)
      SetTooltipText(InformationTooltip, GetString(SI_CRAFTING_CLEAR_SELECTIONS))
    })
  )
  TemperPotionsClearFilter.SetHandler("OnMouseExit", () => {
    ClearTooltip(InformationTooltip)
  })

  const loading = WINDOW_MANAGER.CreateControlFromVirtual(
    "TemperPotionsLoading",
    TemperPotionsOutput,
    "ZO_Loading"
  )
  loading.SetAnchor(CENTER)
  ZO_Loading_Initialize(loading, "")
  PotMaker.loading = loading
}
PotMaker.initWindows = initWindows
