export interface LakTable {
  name: string
  version: number
  showAddonKeybinds: boolean
}

export interface KeybindRowData {
  actionName: string
}

export interface KeybindScrollEntry {
  typeId: number
  data?: KeybindRowData
}

export type KeybindScrollData = KeybindScrollEntry[]
