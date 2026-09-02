interface MailData {
  numAttachments: number
}

interface InventorySortEntry {
  data?: InventoryRowSlotData
}

interface TradeSlotColumn {
  Control?: Control
}

interface TradeWindow {
  Columns: Record<number, Record<number, TradeSlotColumn | undefined>>
}

declare const TRADE: TradeWindow

declare function zo_strlen(this: void, str: string): number

declare function ZO_ScrollList_GetDataTypeTable(
  this: void,
  list: Control,
  typeId: number
): ZoScrollListDataType | undefined

declare function ZO_CurrencyControl_SetSimpleCurrency(
  this: void,
  control: Control,
  currencyType: number,
  amount: number,
  options: unknown
): undefined

declare const ITEM_SLOT_CURRENCY_OPTIONS: unknown
