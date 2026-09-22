interface TemperCustomMenuEntry {
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

type TemperCustomMenuHook = (this: void, ...args: unknown[]) => void

interface TemperCustomMenu {
  RegisterContextMenu: (
    this: TemperCustomMenu,
    func: TemperCustomMenuHook,
    category?: number,
    ...args: unknown[]
  ) => void
  RegisterSpecialKeyContextMenu: (
    this: TemperCustomMenu,
    func: TemperCustomMenuHook,
    ...args: unknown[]
  ) => void
  RegisterPlayerContextMenu: (
    this: TemperCustomMenu,
    func: TemperCustomMenuHook,
    category?: number,
    ...args: unknown[]
  ) => void
  RegisterGuildRosterContextMenu: (
    this: TemperCustomMenu,
    func: TemperCustomMenuHook,
    category?: number,
    ...args: unknown[]
  ) => void
  RegisterFriendsListContextMenu: (
    this: TemperCustomMenu,
    func: TemperCustomMenuHook,
    category?: number,
    ...args: unknown[]
  ) => void
  RegisterIgnoreListContextMenu: (
    this: TemperCustomMenu,
    func: TemperCustomMenuHook,
    category?: number,
    ...args: unknown[]
  ) => void
  RegisterGroupListContextMenu: (
    this: TemperCustomMenu,
    func: TemperCustomMenuHook,
    category?: number,
    ...args: unknown[]
  ) => void
  RegisterKeyStripEnter: (
    this: TemperCustomMenu,
    func: TemperCustomMenuHook,
    category?: number,
    ...args: unknown[]
  ) => void
  RegisterKeyStripExit: (
    this: TemperCustomMenu,
    func: TemperCustomMenuHook,
    ...args: unknown[]
  ) => void
  EnableSpecialKeyContextMenu: (this: TemperCustomMenu, key: number) => void
  readonly DIVIDER: string
  readonly headerFont: string
  readonly CATEGORY_EARLY: number
  readonly CATEGORY_PRIMARY: number
  readonly CATEGORY_SECONDARY: number
  readonly CATEGORY_TERTIARY: number
  readonly CATEGORY_QUATERNARY: number
  readonly CATEGORY_LATE: number
}

declare const TemperCustomMenu: TemperCustomMenu

declare function AddCustomSubMenuItem(
  labelText: string,
  entries: readonly TemperCustomMenuEntry[] | ((this: void) => readonly TemperCustomMenuEntry[]),
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
