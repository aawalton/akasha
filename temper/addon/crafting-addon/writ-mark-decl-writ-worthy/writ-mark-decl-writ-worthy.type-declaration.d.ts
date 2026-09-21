declare const TemperWritInventoryList: { singleton?: TemperWritInventoryListSingleton } | undefined

interface MailInbox {
  RefreshAttachmentSlots?: (this: MailInbox) => undefined
  GetMailData: (this: MailInbox, mailId: Id64, isMailFromGuild: boolean) => MailData
  attachmentSlots?: Record<number, Control | undefined>
  isMailFromGuild?: boolean
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
