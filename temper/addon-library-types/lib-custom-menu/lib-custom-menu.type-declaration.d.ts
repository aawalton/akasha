interface LibCustomMenuEntry {
  label: string | ((this: void) => string)
  callback?: (this: void) => void
  itemType?: number
  tooltip?: string | ((this: void, control: object, inside: boolean) => string)
  checked?: boolean | ((this: void) => boolean)
  disabled?: boolean | ((this: void) => boolean)
  visible?: boolean | ((this: void) => boolean)
  myfont?: string
  normalColor?: unknown
  highlightColor?: unknown
}

type LibCustomMenuHook = (this: void, ...args: unknown[]) => void

interface LibCustomMenu {
  RegisterContextMenu: (
    this: LibCustomMenu,
    func: LibCustomMenuHook,
    category?: number,
    ...args: unknown[]
  ) => void
  RegisterSpecialKeyContextMenu: (
    this: LibCustomMenu,
    func: LibCustomMenuHook,
    ...args: unknown[]
  ) => void
  RegisterPlayerContextMenu: (
    this: LibCustomMenu,
    func: LibCustomMenuHook,
    category?: number,
    ...args: unknown[]
  ) => void
  RegisterGuildRosterContextMenu: (
    this: LibCustomMenu,
    func: LibCustomMenuHook,
    category?: number,
    ...args: unknown[]
  ) => void
  RegisterFriendsListContextMenu: (
    this: LibCustomMenu,
    func: LibCustomMenuHook,
    category?: number,
    ...args: unknown[]
  ) => void
  RegisterIgnoreListContextMenu: (
    this: LibCustomMenu,
    func: LibCustomMenuHook,
    category?: number,
    ...args: unknown[]
  ) => void
  RegisterGroupListContextMenu: (
    this: LibCustomMenu,
    func: LibCustomMenuHook,
    category?: number,
    ...args: unknown[]
  ) => void
  RegisterKeyStripEnter: (
    this: LibCustomMenu,
    func: LibCustomMenuHook,
    category?: number,
    ...args: unknown[]
  ) => void
  RegisterKeyStripExit: (this: LibCustomMenu, func: LibCustomMenuHook, ...args: unknown[]) => void
  EnableSpecialKeyContextMenu: (this: LibCustomMenu, key: number) => void
  readonly DIVIDER: string
  readonly headerFont: string
  readonly CATEGORY_EARLY: number
  readonly CATEGORY_PRIMARY: number
  readonly CATEGORY_SECONDARY: number
  readonly CATEGORY_TERTIARY: number
  readonly CATEGORY_QUATERNARY: number
  readonly CATEGORY_LATE: number
}

declare const LibCustomMenu: LibCustomMenu

declare function AddCustomSubMenuItem(
  labelText: string,
  entries: readonly LibCustomMenuEntry[] | ((this: void) => readonly LibCustomMenuEntry[]),
  myfont?: string,
  normalColor?: unknown,
  highlightColor?: unknown,
  itemYPad?: number,
  callback?: (this: void, control: object) => void
): number

declare const AddCustomMenuTooltip: (
  tooltip: string | ((this: void, control: object, inside: boolean) => string),
  index?: number
) => void

declare const MENU_ADD_OPTION_HEADER: number
