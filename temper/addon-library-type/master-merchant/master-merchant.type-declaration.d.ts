interface MasterMerchantItemStats {
  avgPrice?: number
  [key: string]: unknown
}

interface MasterMerchantApi {
  isInitialized?: boolean
  itemStats: (
    this: MasterMerchantApi,
    itemLink: string,
    showInBonanza?: boolean
  ) => MasterMerchantItemStats | undefined
  GetTooltipStats: (
    this: MasterMerchantApi,
    itemLink: string,
    requireSales: boolean,
    showInBonanza: boolean
  ) => MasterMerchantItemStats | undefined
  vendor_price_table?: Record<string, Record<string, number | undefined> | undefined>
}

declare const MasterMerchant: MasterMerchantApi | undefined
