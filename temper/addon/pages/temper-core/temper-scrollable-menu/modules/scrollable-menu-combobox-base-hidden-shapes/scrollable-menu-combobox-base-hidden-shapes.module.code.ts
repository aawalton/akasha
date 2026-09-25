type LsmCastLocalContextMenuLike3 = ContextMenuLike

export function asLsmCastLocalContextMenuLike3(value: unknown): LsmCastLocalContextMenuLike3 {
  return value as LsmCastLocalContextMenuLike3
}

type LsmCastLocalDropdownObjectLike = DropdownObjectLike

export function asLsmCastLocalDropdownObjectLike(value: unknown): LsmCastLocalDropdownObjectLike {
  return value as LsmCastLocalDropdownObjectLike
}

export function asBoolean(this: void, value: boolean): boolean {
  return value
}

interface ContextMenuLike {
  IsDropdownVisible: (this: void) => boolean
  m_container?: unknown
  m_dropdownObject: { WasTextSearchContextMenuEntryClicked: (this: void) => boolean }
}

interface DropdownObjectLike {
  IsOwnedByComboBox: (this: void, comboBox: unknown) => boolean
  WasTextSearchContextMenuEntryClicked: (this: void) => boolean
}

type LsmCloseContextMenuAndSuppressClickCheck = (
  this: void,
  checkOnlyMultiSelectionAtContextMenu: unknown,
  isMouseOverOwningDropdown: unknown,
  clickedEntryBelongsToContextMenu: unknown
) => boolean | undefined

export function asLsmCloseContextMenuAndSuppressClickCheck(
  value: unknown
): LsmCloseContextMenuAndSuppressClickCheck {
  return value as LsmCloseContextMenuAndSuppressClickCheck
}

type LsmWasTextSearchContextMenuEntryClickedCheck = (
  this: void,
  selfVar: ComboBoxBase,
  mocCtrl: Record<string, unknown> | undefined,
  wasTextSearchContextMenuEntryClicked: unknown,
  isContextMenu: unknown
) => unknown

export function asLsmWasTextSearchContextMenuEntryClickedCheck(
  value: unknown
): LsmWasTextSearchContextMenuEntryClickedCheck {
  return value as LsmWasTextSearchContextMenuEntryClickedCheck
}
