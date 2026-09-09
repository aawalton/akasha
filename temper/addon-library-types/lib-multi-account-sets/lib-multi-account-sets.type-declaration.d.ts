interface LmasServerEntry {
  server: string
  accounts: string[]
}

interface LibMultiAccountSetsApi {
  EVENT_COLLECTION_UPDATED: string
  ITEM_COLLECTED: number
  ITEM_UNCOLLECTED_NOTRADE: number

  RegisterForCallback: (name: string, event: string, callback: (this: void) => void) => void

  GetServerAndAccountList?: (includeCurrent: boolean) => LmasServerEntry[]

  GetNumItemSetCollectionSlotsUnlockedForAccountEx: (
    server: string | undefined,
    account: string | undefined,
    setId: number
  ) => number
  GetItemReconstructionCurrencyOptionCostForAccountEx: (
    server: string | undefined,
    account: string | undefined,
    setId: number,
    currencyType: number
  ) => number | undefined
  IsItemSetCollectionSlotUnlockedForAccountEx: (
    server: string | undefined,
    account: string | undefined,
    setId: number,
    slot: Id64
  ) => boolean

  GetItemCollectionAndTradabilityStatus: (
    accounts: string[],
    itemLink: string,
    itemSource: unknown
  ) => { [account: string]: number | undefined }
}

declare const LibMultiAccountSets: LibMultiAccountSetsApi | undefined
