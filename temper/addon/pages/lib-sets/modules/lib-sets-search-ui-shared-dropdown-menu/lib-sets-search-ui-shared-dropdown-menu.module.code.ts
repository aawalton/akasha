import { asPresent } from "akasha/temper/addon/pages/lib-sets/modules/lib-sets-casts/lib-sets-casts.module.code.ts"
import { asAnyObjectOpt } from "akasha/temper/addon/pages/lib-sets/modules/lib-sets-search-ui-casts/lib-sets-search-ui-casts.module.code.ts"
import {
  favoriteIconWithNameTexts,
  getComboBoxFromDropdownControl,
  invertSelectionStr,
} from "akasha/temper/addon/pages/lib-sets/modules/lib-sets-search-ui-shared-state/lib-sets-search-ui-shared-state.module.code.ts"

export function showDropdownContextMenu(
  this: LibSetsSearchUISharedObject,
  dropdownControl: SearchUIControl,
  _shift?: boolean,
  _alt?: boolean,
  _ctrl?: boolean,
  _command?: boolean
): undefined {
  if (!LibSets.CheckLSM()) {
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
      for (const [, favoriteCategoryData] of ipairs(LibSets.possibleSetSearchFavoriteCategories)) {
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
      const [setIdsOfCurrentZone, currentZoneId, currentParentZoneId] =
        LibSets.GetSetIdsOfCurrentZone()
      if (!ZO_IsTableEmpty(asAnyObjectOpt(setIdsOfCurrentZone) ?? {})) {
        const [currentZoneName, currentParentZoneName] = LibSets.GetCurrentZoneName()
        const currentZoneSetStr = `${LibSets.GetLocalizedText("showCurrentZoneSets")} '${currentZoneName}' (${tostring(currentZoneId)})`

        const entriesToSelect = [currentZoneId]
        AddCustomScrollableMenuEntry(currentZoneSetStr, () => {
          this.SelectMultiSelectDropdownEntries(dropdownControl, entriesToSelect, true)
        })
        if (currentParentZoneId !== undefined && currentParentZoneId !== currentZoneId) {
          const currentParentZoneSetStr = `${LibSets.GetLocalizedText("showCurrentZoneSets")} '${currentParentZoneName}' (${tostring(currentParentZoneId)})`
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
