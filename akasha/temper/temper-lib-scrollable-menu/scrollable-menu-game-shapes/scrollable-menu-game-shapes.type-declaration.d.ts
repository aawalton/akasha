declare const ZO_COMBO_BOX_ENTRY_TEMPLATE_LABEL_PADDING: number
declare const MAX_TEXT_CHAT_INPUT_CHARACTERS: number
declare const DONT_ANIMATE_INSTANTLY: number
declare const MENU_TYPE_DEFAULT: number
declare const ZO_REMOTE_SCENE_CHANGE_ORIGIN: number
declare const ZO_GAMEPAD_UNSELECTED_COLOR: ZoColorDef
declare const GetAnimationManager: (this: void) => Record<string, unknown>
declare const GetEventManager: (this: void) => Record<string, unknown>
declare const RequestAlert: (this: void, category: number, soundId: string, text: string) => void
declare const ZO_ComboBox_HideDropdown: (this: void, control: Control) => void
declare const ZO_ScrollList_SetHeight: (this: void, scrollControl: Control, height: number) => void

interface ZoComboBoxInstance {
  GetSpacing: (this: ZoComboBoxInstance) => number
  SetVisible: (this: ZoComboBoxInstance, visible: boolean) => void
  SetDropdownObject: (this: ZoComboBoxInstance, dropdownObject: unknown) => void
  GetEntries: (this: ZoComboBoxInstance) => unknown[]
  IsItemSelected: (this: ZoComboBoxInstance, item: unknown) => boolean
  GetNumSelectedEntries: (this: ZoComboBoxInstance) => number
  AddItemToSelected: (this: ZoComboBoxInstance, item: unknown) => void
  RemoveItemFromSelected: (this: ZoComboBoxInstance, item: unknown) => void
  GetSelectionBlockedErrorText: (this: ZoComboBoxInstance) => string
  RefreshSelectedItemText: (this: ZoComboBoxInstance) => void
  SetSelectedItemText: (this: ZoComboBoxInstance, text: string) => void
  SetSortsItems: (this: ZoComboBoxInstance, sortsItems: boolean) => void
  ClearAllSelections: (this: ZoComboBoxInstance) => void
  GetContainer: (this: ZoComboBoxInstance) => Control
  OnClearItems: (this: ZoComboBoxInstance) => void
  [key: string]: unknown
}
interface ZoComboBoxClass {
  Subclass: (this: ZoComboBoxClass) => ZoComboBoxClass
}

interface ZoRadioButtonGroupInstance {
  m_buttons: Record<string, unknown>
  [key: string]: unknown
}
interface ZoRadioButtonGroupClass {
  Subclass: (this: ZoRadioButtonGroupClass) => ZoRadioButtonGroupClass
  New: (this: ZoRadioButtonGroupClass, ...args: unknown[]) => ZoRadioButtonGroupInstance
  [key: string]: unknown
}
declare const ZO_RadioButtonGroup: ZoRadioButtonGroupClass

interface ZoAnchor {
  SetTarget: (this: ZoAnchor, target: Control) => void
  AddToControl: (this: ZoAnchor, control: Control) => void
}

interface ZoEntryDataInstance {
  [key: string]: unknown
}
interface ZoEntryDataClass {
  New: (this: ZoEntryDataClass, item: unknown) => ZoEntryDataInstance
  [key: string]: unknown
}
declare const ZO_EntryData: ZoEntryDataClass
