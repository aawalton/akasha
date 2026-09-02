export {}

declare global {
  const ELLIPSIS: number

  const ZO_COMBOBOX_SUPRESS_UPDATE: boolean

  const ZO_Menu_GetNumMenuItems: (this: void) => number

  interface CollectibleDataObject {
    collectibleId: number
    houseLocation: string
    IsHouse: (this: CollectibleDataObject) => boolean
    IsLocked: (this: CollectibleDataObject) => boolean
    GetReferenceId: (this: CollectibleDataObject) => number
    GetFormattedName: (this: CollectibleDataObject) => string
    GetHouseLocation: (this: CollectibleDataObject) => string
  }

  interface CollectibleDataManager {
    GetAllCollectibleDataObjects: (this: CollectibleDataManager) => CollectibleDataObject[]
  }

  interface LibAddonMenu2 {
    OpenToPanel: (this: LibAddonMenu2, panel: unknown) => void
  }
}
