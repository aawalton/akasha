interface TemperWorldMiniMapZoom {
  zoomIn: number
  zoomOut: number
}

interface TemperWorldMiniMapGlobal {
  name: string
  account: TemperWorldMiniMapZoom
  ToggleShowMap: () => void
  ToggleShowHUD: () => void
  ToggleShowCombat: () => void
  ToggleShowSiege: () => void
  ToogleZoom: (enabled: boolean, zoom?: number) => void
  StepZoom: (add: boolean) => void
  ToggleFixedOffset: () => void
}

declare var TemperWorldMiniMap: TemperWorldMiniMapGlobal

declare var TemperVotansMiniMap_SavedVariables: unknown

declare let VOTAN_MINIMAP_FONT: FontObject | undefined
