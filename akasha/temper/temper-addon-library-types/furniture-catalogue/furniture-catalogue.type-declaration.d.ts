declare const FURC_CRAFTING: number
declare const FURC_VENDOR: number
declare const FURC_PVP: number
declare const FURC_CROWN: number
declare const FURC_LUXURY: number
declare const FURC_ROLIS: number
declare const FURC_DROP: number
declare const FURC_JUSTICE: number
declare const FURC_RUMOUR: number
declare const FURC_FESTIVAL_DROP: number

interface FurCRecipe {
  origin: number
  version: number
  blueprint?: number
  [field: string]: unknown
}

interface FurCPriceLeaf {
  itemPrice?: number
}

type FurCItemMap = Record<string, FurCPriceLeaf | undefined>

type FurCVendorTree = Record<string, Record<string, FurCItemMap | undefined> | undefined>

interface FurCUtils {
  GetItemId: (this: void, itemLink: string) => number
  GetItemLink: (this: void, id: number) => string
}

interface FurCApi {
  Utils: FurCUtils
  Find: (this: void, itemLink: string) => FurCRecipe | undefined
  GetItemDescription: (this: void, itemId: number, recipe: FurCRecipe) => string
  Rolis: Record<string, Record<string, number | undefined> | undefined>
  Faustina: Record<string, Record<string, number | undefined> | undefined>
  LuxuryFurnisher: Record<string, Record<string, FurCPriceLeaf | undefined> | undefined>
  AchievementVendors: Record<string, FurCVendorTree | undefined>
  MiscItemSources: Record<
    string,
    | Record<string, Record<string, number | string | FurCPriceLeaf | undefined> | undefined>
    | undefined
  >
  PVP: Record<string, FurCVendorTree | undefined>
}

declare const FurC: FurCApi | undefined
