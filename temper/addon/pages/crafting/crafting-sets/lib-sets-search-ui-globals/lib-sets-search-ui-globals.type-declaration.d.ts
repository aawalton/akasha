declare const IsLibSetsAlreadyLoaded: (this: void, outputMsg?: boolean) => boolean

declare const LibSets_SearchUI_Shared: {
  setId: number | undefined
  GetAllFavoritesCategories: (this: void, setId: number | undefined) => string[]
}

declare const LibSets_SearchUI_Shared_IsShown: (this: void) => boolean
declare const LibSets_SearchUI_Shared_UpdateSearch: (this: void, searchParams: unknown[]) => void
declare const LibSets_SearchUI_Shared_ToggleUI: (this: void, searchParams?: unknown[]) => void

declare const LibSets_SearchUI_Keyboard_TopLevel_OnInitialized: (
  this: void,
  control: unknown
) => void

declare const LibSets_SearchUI_TooltipTopLevel: SearchUIControl
declare const LibSets_SearchUI_Tooltip: SearchUIControl

declare let LibSets_SearchUI_List: LibSetsSearchUIListClass
