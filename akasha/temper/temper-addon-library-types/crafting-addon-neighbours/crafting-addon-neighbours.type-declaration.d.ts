declare const LFFT: undefined

declare const FCOIsMarked: ((this: void, ...args: unknown[]) => boolean) | undefined

declare const FilterIt:
  | {
      GetFilterResult: (this: void, ...args: unknown[]) => unknown
      AccountSavedVariables: { FilteredItems: Record<string, number | undefined> }
    }
  | undefined

declare const WritCreater: {
  savedVars: { tutorial: boolean | undefined }
}

interface TamrielTradeCentreItemInfoStatic {
  New: (itemLink: string) => unknown
}

declare const TamrielTradeCentre_ItemInfo: TamrielTradeCentreItemInfoStatic | undefined

interface FcoisAddonVars {
  gPlayerActivated: boolean
}

interface Fcois {
  addonVars: FcoisAddonVars
  IsEnchantingLocked: (this: void, bagId: number, slotIndex: number) => boolean
  IsJewelryResearchLocked: (this: void, bagId: number, slotIndex: number) => boolean
  IsResearchLocked: (this: void, bagId: number, slotIndex: number) => boolean
  IsMarked: (this: void, ...args: unknown[]) => boolean
  IsAlchemyDestroyLocked?: (this: void, bagId: number, slotIndex: number) => boolean
}

interface ItemSaverSetData {
  filterDeconstruction?: boolean
  filterResearch?: boolean
}

declare const ItemSaver_GetSetData: ((this: void, setName: string) => ItemSaverSetData) | undefined

interface ChatProxy {
  Print: (str: string | undefined) => undefined
}
