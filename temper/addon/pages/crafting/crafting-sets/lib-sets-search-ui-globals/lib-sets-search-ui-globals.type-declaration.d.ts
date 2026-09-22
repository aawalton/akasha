declare const IsLibSetsAlreadyLoaded: (this: void, outputMsg?: boolean) => boolean

declare const LibSets_SearchUI_Shared: {
  setId: number | undefined
  GetAllFavoritesCategories: (this: void, setId: number | undefined) => string[]
}

declare const LibSets_SearchUI_TooltipTopLevel: SearchUIControl
declare const LibSets_SearchUI_Tooltip: SearchUIControl
