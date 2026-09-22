export interface DropMechanicScratch {
  zoneNamesProcessed: { [zoneId: number]: unknown }
  dropMechanicNamesProcessed: { [dropMechanicId: number]: unknown }
  dropZoneNames: { [idx: number]: unknown }
  parentDropZoneNames: { [idx: number]: unknown }
  dropMechanicNames: { [idx: number]: unknown }
  dropMechanicNamesClean: { [idx: number]: unknown }
  dropLocationNames: { [idx: number]: unknown }
  dropZoneIdsTheSame: { [zoneId: number]: number[] } | undefined
  dropMechanicTabTheSame: { [zoneId: number]: { [idx: number]: number } } | undefined
}

export interface TooltipState {
  tooltipSV: { [key: string]: unknown } | undefined
  setPreviewTooltipSV: { [key: string]: unknown } | undefined

  addReconstructionCost: boolean | undefined
  addDLC: boolean | undefined
  addDropLocation: boolean | undefined
  addDropMechanic: boolean | undefined
  addBossName: boolean | undefined
  addSetType: boolean | undefined
  addNeededTraits: boolean | undefined
  addFavorites: boolean | undefined
  tooltipTextures: boolean | undefined
  anyTooltipInfoToAdd: boolean

  lastTooltipItemLink: string | undefined

  useCustomTooltip: boolean
  setReconstructionCostPlaceholder: boolean
  setTypePlaceholder: boolean
  dropMechanicPlaceholder: boolean
  dropZonesPlaceholder: boolean
  bossNamePlaceholder: boolean
  neededTraitsPlaceholder: boolean
  dlcNamePlaceHolder: boolean
  setSearchFavoritesPlaceHolder: boolean
  lastPlaceHolderInCustomTooltip: string | undefined
  addLineBreakAfterNonEmptyParts: boolean

  veteranDungeonIconStr: string

  scratch: DropMechanicScratch

  libSetsSearchUIShared: { [key: string]: unknown } | undefined
  allSetNamesCached: { [setId: number]: { [lang: string]: string } } | undefined
}

export const STATE: TooltipState = {
  tooltipSV: undefined,
  setPreviewTooltipSV: undefined,

  addReconstructionCost: undefined,
  addDLC: undefined,
  addDropLocation: undefined,
  addDropMechanic: undefined,
  addBossName: undefined,
  addSetType: undefined,
  addNeededTraits: undefined,
  addFavorites: undefined,
  tooltipTextures: undefined,
  anyTooltipInfoToAdd: false,

  lastTooltipItemLink: undefined,

  useCustomTooltip: false,
  setReconstructionCostPlaceholder: false,
  setTypePlaceholder: false,
  dropMechanicPlaceholder: false,
  dropZonesPlaceholder: false,
  bossNamePlaceholder: false,
  neededTraitsPlaceholder: false,
  dlcNamePlaceHolder: false,
  setSearchFavoritesPlaceHolder: false,
  lastPlaceHolderInCustomTooltip: undefined,
  addLineBreakAfterNonEmptyParts: false,

  veteranDungeonIconStr: "",

  scratch: {
    zoneNamesProcessed: {},
    dropMechanicNamesProcessed: {},
    dropZoneNames: {},
    parentDropZoneNames: {},
    dropMechanicNames: {},
    dropMechanicNamesClean: {},
    dropLocationNames: {},
    dropZoneIdsTheSame: undefined,
    dropMechanicTabTheSame: undefined,
  },

  libSetsSearchUIShared: undefined,
  allSetNamesCached: undefined,
}
