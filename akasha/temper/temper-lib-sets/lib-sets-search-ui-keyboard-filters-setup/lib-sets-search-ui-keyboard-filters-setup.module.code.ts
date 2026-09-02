import { asTyped } from "../lib-sets-casts/lib-sets-casts.module.code.ts"

const getLocalizedText = LibSets.GetLocalizedText

export function comboBoxFromContainer(this: void, container: SearchUIControl): SearchUIComboBox {
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

export function comboBoxSupportsMouseOver(this: void): boolean {
  return ZO_ComboBox.SetEntryMouseOverCallbacks !== undefined
}

export function comboBoxSupportsMultiSelect(this: void): boolean {
  return ZO_ComboBox.EnableMultiSelect !== undefined
}

interface FilterSetupParams {
  self: LibSetsSearchUIKeyboardObject
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
