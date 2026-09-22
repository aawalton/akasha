import { asLabelControl } from "akasha/temper/addon/pages/items/crafting-station/modules/potion-casts/potion-casts.module.code.ts"
import { getPlayerSettings } from "akasha/temper/addon/pages/items/crafting-station/modules/potion-saved-variables/potion-saved-variables.module.code.ts"
import { PotMaker } from "akasha/temper/addon/pages/items/crafting-station/modules/potion-state/potion-state.module.code.ts"
import { isThirdAlchemySlotUnlocked } from "akasha/temper/addon/pages/items/crafting-station/modules/potion-tooltip-helpers/potion-tooltip-helpers.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/crafting-station/potion-decl-controls/potion-decl-controls.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-alchemy-station/eso-alchemy-station.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-deconstruction/eso-deconstruction.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-09/eso-enums-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-sort-filter-list/eso-sort-filter-list.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-world-map-filters/eso-world-map-filters.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

export function saveSolventSelection(this: void): undefined {
  const selected = PotMaker.SelectedSolvents[PotMaker.solventMode]
  if (selected === undefined) {
    return
  }
  for (const checkBox of PotMaker.SolventFilterControls) {
    selected.set(checkBox, !checkBox.IsControlHidden() && PotMaker.ToggleButtonIsChecked(checkBox))
  }
}

export function loadSolventSelection(this: void): undefined {
  const selected = PotMaker.SelectedSolvents[PotMaker.solventMode]
  if (selected === undefined) {
    return
  }
  for (const checkBox of PotMaker.SolventFilterControls) {
    PotMaker.SetToggleButton(
      checkBox,
      !checkBox.IsControlHidden() && (selected.get(checkBox) ?? false)
    )
  }
}

function showTopLevelWindow(this: void): undefined {
  TemperPotionsOutput.title = PotMaker.modeBarLabel
  TemperPotions.title = PotMaker.modeBarLabel

  TemperPotions.ClearAnchors()
  TemperPotions.SetParent(TemperPotionsTopLevel)
  TemperPotions.SetAnchor(TOPLEFT, undefined, TOPLEFT, 0, 76)
  TemperPotions.SetHeight(550)
  TemperPotionsOutput.ClearAnchors()
  TemperPotionsOutput.SetParent(TemperPotionsTopLevel)
  TemperPotionsOutput.SetAnchor(TOPLEFT, undefined, TOPLEFT, 0, 25)

  TemperPotionsTopLevel.ClearAnchors()
  TemperPotionsTopLevel.SetAnchor(TOPLEFT, ZO_SharedRightPanelBackground, TOPLEFT, 0, 45 + 32)
  TemperPotionsTopLevel.SetAnchor(BOTTOMLEFT, ZO_SharedRightPanelBackground, BOTTOMLEFT, 0, -30)
  PotMaker.loading.SetParent(TemperPotionsTopLevel)
}

function showStationMenu(this: void, parent: Control): undefined {
  TemperPotionsOutput.title = asLabelControl(PotMaker.LAS)
  TemperPotions.title = asLabelControl(PotMaker.LAS)

  TemperPotions.ClearAnchors()
  TemperPotions.SetParent(parent)
  TemperPotions.SetAnchor(TOPLEFT, undefined, TOPLEFT, 0, 76)
  TemperPotions.SetHeight(550)
  TemperPotionsOutput.ClearAnchors()
  TemperPotionsOutput.SetParent(parent)
  TemperPotionsOutput.SetAnchor(TOPLEFT, undefined, TOPLEFT, 0, 25)
  TemperPotionsTopLevel.SetHidden(true)
  PotMaker.loading.SetParent(parent)
}

export function showStationOrTopLevel(this: void): undefined {
  const poison = PotMaker.solventMode === ITEMTYPE_POISON_BASE

  PotMaker.createControls()
  if (!IsInGamepadPreferredMode() && PotMaker.atAlchemyStation) {
    const contentWindow = poison ? PotMaker.contentWindowPoison : PotMaker.contentWindowPotion
    showStationMenu(contentWindow)
  } else {
    showTopLevelWindow()
  }
  if (!poison) {
    let isChecked = true
    for (const checkBox of PotMaker.NegativeTraitControls) {
      isChecked =
        isChecked &&
        PotMaker.GetToggleButtonCheckState(checkBox) === TRISTATE_CHECK_BUTTON_UNCHECKED
    }
    ZO_CheckButton_SetCheckState(TemperPotionsAllMustNotCheckBox, isChecked)
    TemperPotionsAllMustNotCheckBoxText.SetText(
      isChecked ? PotMaker.language.uncheck_all : PotMaker.language.check_all
    )
  }

  TemperPotionsQuestWrits.SetHidden(!PotMaker.atAlchemyStation)
  TemperPotionsAllMustNotCheckBox.SetHidden(poison)
  TemperPotionsAllMustNotCheckBoxText.SetHidden(poison)

  const disableThirdSlot = !(isThirdAlchemySlotUnlocked() || getPlayerSettings().fakeThirdSlot)
  TemperPotionsOnly2.SetHidden(disableThirdSlot)
  TemperPotionsOnly2Text.SetHidden(disableThirdSlot)
}

export function showFilterPage(this: void): undefined {
  const descriptor = PotMaker.LAS.GetSelectedTab()
  if (descriptor === PotMaker.descriptorPotion) {
    TemperPotions.title.SetText(GetString(SI_BINDING_NAME_POTIONMAKER))
  } else if (descriptor === PotMaker.descriptorPoison) {
    TemperPotions.title.SetText(GetString(SI_BINDING_NAME_POISONMAKER))
  }
  TemperPotions.SetHidden(false)
  TemperPotionsOutput.SetHidden(true)
  PotMaker.resultListShown = false
  PotMaker.StopJobs()
}

export function clearResultList(this: void): undefined {
  ZO_ClearNumericallyIndexedTable(PotMaker.doablePotions)
  collectgarbage()
}

export function clearInventory(this: void): undefined {
  PotMaker.StopJobs()
  PotMaker.Inventory.reagents = {}
  PotMaker.Inventory.solvents = {}
  for (const v of PotMaker.SolventFilterControls) {
    v.SetHidden(true)
  }
  for (const v of PotMaker.ResultControls) {
    v.SetHidden(true)
  }
  PotMaker.quests = undefined
}

export function refreshTitle(this: void): undefined {
  if (PotMaker.resultListShown) {
    if (PotMaker.favoritesOnly) {
      TemperPotionsOutput.title.SetText(PotMaker.language.favorites)
    } else {
      TemperPotionsOutput.title.SetText(PotMaker.language.search_results)
    }
  } else {
    const descriptor = ZO_MenuBar_GetSelectedDescriptor(PotMaker.modeBar)
    if (descriptor === PotMaker.descriptorPotion) {
      TemperPotions.title.SetText(GetString(SI_BINDING_NAME_POTIONMAKER))
    } else if (descriptor === PotMaker.descriptorPoison) {
      TemperPotions.title.SetText(GetString(SI_BINDING_NAME_POISONMAKER))
    }
  }
}

export function refreshCurrentPage(this: void): undefined {
  if (PotMaker.resultListShown) {
    PotMaker.restartSearch()
  } else {
    clearResultList()
    PotMaker.updateControls()
  }
}
