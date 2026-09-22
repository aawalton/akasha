import { asPresent } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-casts/sets-casts.module.code.ts"
import { lib } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"
import { asAnyObjectOpt } from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-search-ui-casts/sets-search-ui-casts.module.code.ts"
import {
  favoriteIconWithNameTexts,
  getComboBoxFromDropdownControl,
  invertSelectionStr,
} from "akasha/temper/addon/pages/crafting/crafting-sets/modules/sets-search-ui-shared-state/sets-search-ui-shared-state.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/type/lib-scrollable-menu/lib-scrollable-menu.type-declaration.d.ts"
import "akasha/temper/addon/pages/crafting/crafting-sets/sets-search-ui-shapes-2/sets-search-ui-shapes-2.type-declaration.d.ts"
import "akasha/temper/addon/pages/crafting/crafting-sets/sets-search-ui-shapes/sets-search-ui-shapes.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lib-sets-strings-2/eso-lib-sets-strings-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"

export function showDropdownContextMenu(
  this: SetsSearchUISharedObject,
  dropdownControl: SearchUIControl,
  _shift?: boolean,
  _alt?: boolean,
  _ctrl?: boolean,
  _command?: boolean
): undefined {
  if (!lib.CheckLSM()) {
    return
  }

  const comboBox = getComboBoxFromDropdownControl(dropdownControl)

  if (
    this.multiSelectFilterDropdowns !== undefined &&
    ZO_IsElementInNumericallyIndexedTable(this.multiSelectFilterDropdowns, dropdownControl)
  ) {
    ClearCustomScrollableMenu()
    const numEntries = comboBox.GetNumItems()
    const numSelectedEntries = comboBox.GetNumSelectedEntries()
    const notAllSelected = numSelectedEntries < numEntries

    if (notAllSelected) {
      AddCustomScrollableMenuEntry(GetString(SI_ITEMFILTERTYPE0), () => {
        this.SelectAllAtMultiSelectDropdown(dropdownControl)
        this.OnFilterChanged(dropdownControl)
      })
    }

    if (numSelectedEntries > 0) {
      if (notAllSelected) {
        AddCustomScrollableMenuEntry(invertSelectionStr, () => {
          this.SelectInvertMultiSelectDropdown(dropdownControl)
          this.OnFilterChanged(dropdownControl)
        })
      }

      AddCustomScrollableMenuEntry(GetString(SI_ATTRIBUTEPOINTALLOCATIONMODE_CLEARKEYBIND1), () => {
        this.ResetMultiSelectDropdown(dropdownControl)
        this.OnFilterChanged(dropdownControl)
      })
    }

    if (dropdownControl === this.favoritesFiltersControl) {
      AddCustomScrollableMenuDivider()
      for (const [, favoriteCategoryData] of ipairs(lib.possibleSetSearchFavoriteCategories)) {
        const favoriteCategory = favoriteCategoryData.category
        const entriesToSelect = [favoriteCategory]
        AddCustomScrollableMenuEntry(
          `${asPresent(favoriteIconWithNameTexts[favoriteCategory])} '${zo_strformat("<<C:1>>", favoriteCategory)}'`,
          () => {
            this.SelectMultiSelectDropdownEntries(dropdownControl, entriesToSelect, true)
          }
        )
      }
    } else if (dropdownControl === this.dropZoneFiltersControl) {
      AddCustomScrollableMenuDivider()
      const [setIdsOfCurrentZone, currentZoneId, currentParentZoneId] = lib.GetSetIdsOfCurrentZone()
      if (!ZO_IsTableEmpty(asAnyObjectOpt(setIdsOfCurrentZone) ?? {})) {
        const [currentZoneName, currentParentZoneName] = lib.GetCurrentZoneName()
        const currentZoneSetStr = `${lib.GetLocalizedText("showCurrentZoneSets")} '${currentZoneName}' (${tostring(currentZoneId)})`

        const entriesToSelect = [currentZoneId]
        AddCustomScrollableMenuEntry(currentZoneSetStr, () => {
          this.SelectMultiSelectDropdownEntries(dropdownControl, entriesToSelect, true)
        })
        if (currentParentZoneId !== undefined && currentParentZoneId !== currentZoneId) {
          const currentParentZoneSetStr = `${lib.GetLocalizedText("showCurrentZoneSets")} '${currentParentZoneName}' (${tostring(currentParentZoneId)})`
          const entriesForParentZoneToSelect = [currentParentZoneId]
          AddCustomScrollableMenuEntry(currentParentZoneSetStr, () => {
            this.SelectMultiSelectDropdownEntries(
              dropdownControl,
              entriesForParentZoneToSelect,
              true
            )
          })
        }
      }
    }

    ShowCustomScrollableMenu(dropdownControl)
  }
}
