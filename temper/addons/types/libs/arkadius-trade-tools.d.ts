interface ArkadiusTradeToolsSalesItemStats {
  avgPrice?: number
  [key: string]: unknown
}

interface ArkadiusTradeToolsSalesApi {
  GetItemSalesStats: (
    this: ArkadiusTradeToolsSalesApi,
    itemId: number,
    itemQuality: number
  ) => ArkadiusTradeToolsSalesItemStats | undefined
}

declare const ArkadiusTradeToolsSales: ArkadiusTradeToolsSalesApi | undefined
