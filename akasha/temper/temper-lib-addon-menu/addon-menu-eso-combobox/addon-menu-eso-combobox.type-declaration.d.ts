interface ZoComboBoxItem {
  name: string | number
  callback?: (this: void, ...args: unknown[]) => void
  data?: unknown
  tooltip?: unknown
  [key: string]: unknown
}

interface LamComboBox extends ZoComboBox {
  m_dropdownObject?: { spacing: number }
  m_multiSelectItemData?: ZoComboBoxItem[]
  m_scroll?: Control
  m_selectedItemData?: ZoComboBoxItem | ZoComboBoxItem[] | undefined
  m_sortedItems: ZoComboBoxItem[]
  CreateItemEntry: (
    this: ZoComboBox,
    name: string | number,
    callback?: (this: void, ...args: unknown[]) => void
  ) => ZoComboBoxItem
  DisableMultiSelect: (this: ZoComboBox) => void
  EnableMultiSelect: (this: ZoComboBox, textFormatter?: unknown, noSelectionText?: unknown) => void
  GetSelectedItemData: (this: ZoComboBox) => ZoComboBoxItem | ZoComboBoxItem[] | undefined
  GetSpacing: (this: ZoComboBox) => number
  RefreshSelectedItemText: (this: ZoComboBox) => void
  SetEnabled: (this: ZoComboBox, enabled: boolean) => void
  SetMaxSelections: (this: ZoComboBox, max: number) => void
  SetSelectedItem: (this: ZoComboBox, text: string | number | undefined) => void
  SetSelectedItemByEval: (
    this: ZoComboBox,
    evalFunction: (this: void, entry: ZoComboBoxItem) => boolean,
    selectionChanged?: boolean
  ) => void
  SetSortOrder: (this: ZoComboBox, sortOrder: unknown, sortType: unknown) => void
  m_maxNumSelections?: number
  m_sortsItems?: boolean
  UpdateItems: (this: ZoComboBox) => void
  SetSelected: (this: ZoComboBox, index: number, selected: boolean) => void
  ClearAllSelections: (this: ZoComboBox) => void
  SetMouseEnabled: (this: unknown, enabled: boolean) => void
  SetDimensions: (this: unknown, width: number, height: number) => void
}

interface ZoComboBoxRow extends Control {
  m_owner?: ZoComboBox
  dataEntry?: { data?: { tooltip?: string | number | ((this: void) => string | number) } }
}
