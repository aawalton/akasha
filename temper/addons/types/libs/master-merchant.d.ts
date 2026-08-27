interface MasterMerchantItemStats {
  avgPrice?: number
  [key: string]: unknown
}

interface MasterMerchantApi {
  itemStats: (
    this: MasterMerchantApi,
    itemLink: string,
    showInBonanza?: boolean
  ) => MasterMerchantItemStats | undefined
}

declare const MasterMerchant: MasterMerchantApi | undefined
