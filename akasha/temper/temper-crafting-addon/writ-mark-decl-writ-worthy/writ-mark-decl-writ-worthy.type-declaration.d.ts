declare const TemperWritInventoryList: { singleton?: TemperWritInventoryListSingleton } | undefined

interface Control {
  SetInheritScale: (inherit: boolean) => undefined
}

interface InventoryRowSlotData {
  lootId?: number
}

interface MailInbox {
  RefreshAttachmentSlots?: (this: MailInbox) => undefined
  GetMailData: (this: MailInbox, mailId: Id64, isMailFromGuild: boolean) => MailData
  attachmentSlots?: Record<number, Control | undefined>
  isMailFromGuild?: boolean
}

interface PlayerInventoryDefinition {
  sortFn?: (this: void, a: InventorySortEntry, b: InventorySortEntry) => boolean
  currentSortKey?: string
  currentSortOrder?: boolean
  temperReplacedSort?: boolean
}

interface PlayerInventoryManager {
  GetTabFilterInfo: (
    this: void,
    self: PlayerInventoryManager,
    inventoryType: number,
    tabControl?: unknown
  ) => LuaMultiReturn<unknown[]>
}

interface TemperWritInventoryData {
  ui_is_completed?: boolean
}

interface TemperWritInventoryListSingleton {
  UniqueIDToInventoryData: (
    this: TemperWritInventoryListSingleton,
    uniqueId: unknown
  ) => TemperWritInventoryData | undefined
}
