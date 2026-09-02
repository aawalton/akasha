interface TemperNavigationApi {
  ADDON_NAME: string
  ADDON_VERSION: string
}

declare var TemperNavigation: TemperNavigationApi

declare var TemperMapPins: TemperNavigationApi

declare var TemperDestinations: TemperNavigationApi

interface TemperVotansMiniMapZoom {
  zoomIn: number
  zoomOut: number
}

interface TemperVotansMiniMapGlobal {
  name: string
  account: TemperVotansMiniMapZoom
  ToggleShowMap: () => void
  ToggleShowHUD: () => void
  ToggleShowCombat: () => void
  ToggleShowSiege: () => void
  ToogleZoom: (enabled: boolean, zoom?: number) => void
  StepZoom: (add: boolean) => void
  ToggleFixedOffset: () => void
}

declare var TemperVotansMiniMap: TemperVotansMiniMapGlobal

declare var TemperVotansMiniMap_SavedVariables: unknown

declare let VOTAN_MINIMAP_FONT: FontObject | undefined
