import "akasha/temper/addon/pages/crafting/crafting-sets/lib-sets-search-ui-shapes-3/lib-sets-search-ui-shapes-3.type-declaration.d.ts"
import "akasha/temper/addon/pages/crafting/crafting-sets/lib-sets-search-ui-shapes/lib-sets-search-ui-shapes.type-declaration.d.ts"

export interface FilterBuildContext {
  self: LibSetsSearchUIKeyboardObject
  filters: SearchUIControl
  isLSMEnabled: boolean
  onEnter: (this: void, comboBox: SearchUIComboBox, entry: SearchUIComboBoxItem | undefined) => void
  onExit: (this: void, comboBox: SearchUIComboBox, entry: SearchUIComboBoxItem | undefined) => void
}
