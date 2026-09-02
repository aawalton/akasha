declare const ZO_AddOns: Control
declare const ZO_AddOnsDivider: Control
declare const ZO_AddOnsList: Control

declare const ClearMenu: () => void

declare function AddCustomMenuItem(
  labelText: string,
  callback?: (this: void) => void,
  itemType?: number
): number

declare const ShowMenu: (owner?: object) => void

declare const MENU_ADD_OPTION_LABEL: number
declare const MENU_ADD_OPTION_CHECKBOX: number

declare const ZO_COMBO_BOX_TEMPLATE: "ZO_ComboBox"
declare const ZO_DEFAULT_BUTTON_TEMPLATE: "ZO_DefaultButton"
declare const ZO_DROPDOWN_BUTTON_TEMPLATE: "ZO_DropdownButton"
