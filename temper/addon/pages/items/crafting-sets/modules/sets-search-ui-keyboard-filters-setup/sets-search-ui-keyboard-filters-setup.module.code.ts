import { asTyped } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-casts/sets-casts.module.code.ts"
import { lib } from "akasha/temper/addon/pages/items/crafting-sets/modules/sets-lib/sets-lib.module.code.ts"
import "akasha/temper/addon/type/temper-scrollable-menu-global/temper-scrollable-menu-global.type-declaration.d.ts"
import "akasha/temper/addon/pages/lib-custom-menu/custom-menu-declarations/custom-menu-declarations.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/crafting-sets/sets-search-ui-shapes-3/sets-search-ui-shapes-3.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/crafting-sets/sets-search-ui-shapes/sets-search-ui-shapes.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-journal-window/eso-journal-window.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

const getLocalizedText = lib.GetLocalizedText

function comboBoxFromContainer(this: void, container: SearchUIControl): SearchUIComboBox {
  return asTyped<SearchUIComboBox>(ZO_ComboBox_ObjectFromContainer(asTyped<Control>(container)))
}

export function defaultMultiSelectSelectedText(this: void, filterTypeText: string): string {
  return getLocalizedText(
    "multiSelectFilterSelectedText",
    undefined,
    filterTypeText,
    filterTypeText
  )
}

function comboBoxSupportsMouseOver(this: void): boolean {
  return ZO_ComboBox.SetEntryMouseOverCallbacks !== undefined
}

function comboBoxSupportsMultiSelect(this: void): boolean {
  return ZO_ComboBox.EnableMultiSelect !== undefined
}

interface FilterSetupParams {
  self: SetsSearchUIKeyboardObject
  filters: SearchUIControl
  control: SearchUIControl
  filterTypeText: string
  multiSelectSelectedText: string | number
  sortsItems: boolean
  lsmOptions: { [key: string]: unknown }
  isLSMEnabled: boolean
  onEnter: (this: void, comboBox: SearchUIComboBox, entry: SearchUIComboBoxItem | undefined) => void
  onExit: (this: void, comboBox: SearchUIComboBox, entry: SearchUIComboBoxItem | undefined) => void
}

export function setupFilterDropdown(this: void, params: FilterSetupParams): SearchUIComboBox {
  const { self, filters, control, filterTypeText } = params
  const dropdown = comboBoxFromContainer(control)
  if (comboBoxSupportsMouseOver()) {
    dropdown.SetEntryMouseOverCallbacks(params.onEnter, params.onExit)
  }
  dropdown.ClearItems()
  dropdown.SetHideDropdownCallback(() => {
    self.OnFilterChanged(control)
  })
  control.tooltipText = filterTypeText
  if (comboBoxSupportsMultiSelect()) {
    dropdown.EnableMultiSelect(
      params.multiSelectSelectedText,
      getLocalizedText("noMultiSelectFiltered", undefined, filterTypeText)
    )
  }
  if (params.isLSMEnabled) {
    const lsmDropdowns = self.LSM_Dropdowns
    if (lsmDropdowns !== undefined) {
      const paramName = self.multiSelectFilterDropdownToSearchParamName.get(control)
      if (paramName !== undefined) {
        lsmDropdowns[paramName] = AddCustomScrollableComboBoxDropdownMenu(
          filters,
          control,
          params.lsmOptions
        )
      }
    }
  }
  dropdown.SetSortsItems(params.sortsItems)
  return dropdown
}
