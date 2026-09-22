import "akasha/code/editor/extension/vscode-api/vscode-api.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-custom-menu/menu-decl/menu-decl.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/scrollable-menu-contextmenu-shapes/scrollable-menu-contextmenu-shapes.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/scrollable-menu-dropdown-shapes/scrollable-menu-dropdown-shapes.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/scrollable-menu-library-shapes/scrollable-menu-library-shapes.type-declaration.d.ts"
import "akasha/temper/addon/pages/temper-core/temper-scrollable-menu/scrollable-menu-util-shapes/scrollable-menu-util-shapes.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

export type LsmCastContextMenuDropdownUndefined = ContextMenuDropdown | undefined
export function asLsmCastContextMenuDropdownUndefined(
  value: unknown
): LsmCastContextMenuDropdownUndefined {
  return value as LsmCastContextMenuDropdownUndefined
}

export type LsmCastContextMenuObjectContextMenuIssuingControlUnkn = ContextMenuObject & {
  contextMenuIssuingControl?: unknown
  m_dropdownObject: { IsOwnedByComboBox: (this: unknown, comboBox: unknown) => boolean }
}
export function asLsmCastContextMenuObjectContextMenuIssuingControlUnkn(
  value: unknown
): LsmCastContextMenuObjectContextMenuIssuingControlUnkn {
  return value as LsmCastContextMenuObjectContextMenuIssuingControlUnkn
}

export type LsmCastContextMenuObjectUndefined = ContextMenuObject | undefined
export function asLsmCastContextMenuObjectUndefined(
  value: unknown
): LsmCastContextMenuObjectUndefined {
  return value as LsmCastContextMenuObjectUndefined
}

export type LsmCastControlControlLsmComboBoxOptionsUndefinedNumbe = [
  Control,
  Control,
  LsmComboBoxOptions | undefined,
  number,
]
export function asLsmCastControlControlLsmComboBoxOptionsUndefinedNumbe(
  value: unknown
): LsmCastControlControlLsmComboBoxOptionsUndefinedNumbe {
  return value as LsmCastControlControlLsmComboBoxOptionsUndefinedNumbe
}

export type LsmCastControlLikeUndefined = ControlLike | undefined
export function asLsmCastControlLikeUndefined(value: unknown): LsmCastControlLikeUndefined {
  return value as LsmCastControlLikeUndefined
}

export type LsmCastControlUndefined = Control | undefined
export function asLsmCastControlUndefined(value: unknown): LsmCastControlUndefined {
  return value as LsmCastControlUndefined
}

export type LsmCastDisableFadeGradientBoolean = { disableFadeGradient?: boolean }
export function asLsmCastDisableFadeGradientBoolean(
  value: unknown
): LsmCastDisableFadeGradientBoolean {
  return value as LsmCastDisableFadeGradientBoolean
}

export type LsmCastDropdownClassPrivateAddEntryToScrollList =
  DropdownClassPrivate["addEntryToScrollList"]
export function asLsmCastDropdownClassPrivateAddEntryToScrollList(
  value: unknown
): LsmCastDropdownClassPrivateAddEntryToScrollList {
  return value as LsmCastDropdownClassPrivateAddEntryToScrollList
}

export type LsmCastDropdownClassPrivateCheckIfEntryRaisesAutomati =
  DropdownClassPrivate["checkIfEntryRaisesAutomaticUpdate"]
export function asLsmCastDropdownClassPrivateCheckIfEntryRaisesAutomati(
  value: unknown
): LsmCastDropdownClassPrivateCheckIfEntryRaisesAutomati {
  return value as LsmCastDropdownClassPrivateCheckIfEntryRaisesAutomati
}

export type LsmCastDropdownClassPrivateDoOnMouseEnterNestedSubmen =
  DropdownClassPrivate["doOnMouseEnterNestedSubmenuChecks"]
export function asLsmCastDropdownClassPrivateDoOnMouseEnterNestedSubmen(
  value: unknown
): LsmCastDropdownClassPrivateDoOnMouseEnterNestedSubmen {
  return value as LsmCastDropdownClassPrivateDoOnMouseEnterNestedSubmen
}

export type LsmCastDropdownClassPrivateDoSubmenuOnMouseEnterNeste =
  DropdownClassPrivate["doSubmenuOnMouseEnterNestedSubmenuChecks"]
export function asLsmCastDropdownClassPrivateDoSubmenuOnMouseEnterNeste(
  value: unknown
): LsmCastDropdownClassPrivateDoSubmenuOnMouseEnterNeste {
  return value as LsmCastDropdownClassPrivateDoSubmenuOnMouseEnterNeste
}

export type LsmCastDropdownClassPrivateHandlerFunctions = DropdownClassPrivate["handlerFunctions"]
export function asLsmCastDropdownClassPrivateHandlerFunctions(
  value: unknown
): LsmCastDropdownClassPrivateHandlerFunctions {
  return value as LsmCastDropdownClassPrivateHandlerFunctions
}

export type LsmCastDropdownClassPrivateRunHandler = DropdownClassPrivate["runHandler"]
export function asLsmCastDropdownClassPrivateRunHandler(
  value: unknown
): LsmCastDropdownClassPrivateRunHandler {
  return value as LsmCastDropdownClassPrivateRunHandler
}

export type LsmCastDropdownComboBoxMDropdownObjectIsOwnedByCombo = DropdownComboBox & {
  m_dropdownObject?: { IsOwnedByComboBox: (this: unknown, comboBox: unknown) => boolean }
  isContextMenu?: boolean
}
export function asLsmCastDropdownComboBoxMDropdownObjectIsOwnedByCombo(
  value: unknown
): LsmCastDropdownComboBoxMDropdownObjectIsOwnedByCombo {
  return value as LsmCastDropdownComboBoxMDropdownObjectIsOwnedByCombo
}

export type LsmCastDropdownComboBoxUndefined = DropdownComboBox | undefined
export function asLsmCastDropdownComboBoxUndefined(
  value: unknown
): LsmCastDropdownComboBoxUndefined {
  return value as LsmCastDropdownComboBoxUndefined
}

export type LsmCastDropdownHeaderChildControl = DropdownHeaderChildControl[]
export function asLsmCastDropdownHeaderChildControl(
  value: unknown
): LsmCastDropdownHeaderChildControl {
  return value as LsmCastDropdownHeaderChildControl
}

export type LsmCastDropdownHeaderChildControlUndefined = DropdownHeaderChildControl | undefined
export function asLsmCastDropdownHeaderChildControlUndefined(
  value: unknown
): LsmCastDropdownHeaderChildControlUndefined {
  return value as LsmCastDropdownHeaderChildControlUndefined
}

export type LsmCastDropdownRowControlUndefined = DropdownRowControl | undefined
export function asLsmCastDropdownRowControlUndefined(
  value: unknown
): LsmCastDropdownRowControlUndefined {
  return value as LsmCastDropdownRowControlUndefined
}

export type LsmCastEntryTypeNumberKeyStringUnknown = { entryType?: number; [key: string]: unknown }
export function asLsmCastEntryTypeNumberKeyStringUnknown(
  value: unknown
): LsmCastEntryTypeNumberKeyStringUnknown {
  return value as LsmCastEntryTypeNumberKeyStringUnknown
}

export type LsmCastFilterBoxDropdownRowControl = { filterBox?: DropdownRowControl }
export function asLsmCastFilterBoxDropdownRowControl(
  value: unknown
): LsmCastFilterBoxDropdownRowControl {
  return value as LsmCastFilterBoxDropdownRowControl
}

export type LsmCastFireCallbacksThisUnknownNameStringArgsUnknownUnde = {
  FireCallbacks: (this: unknown, name: string, ...args: unknown[]) => undefined
}
export function asLsmCastFireCallbacksThisUnknownNameStringArgsUnknownUnde(
  value: unknown
): LsmCastFireCallbacksThisUnknownNameStringArgsUnknownUnde {
  return value as LsmCastFireCallbacksThisUnknownNameStringArgsUnknownUnde
}
