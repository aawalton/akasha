interface TemperWorldApi {
  ADDON_NAME: string
  ADDON_VERSION: string
  toggleRDL: (this: void, extra?: string) => undefined
  ShowJournal: (this: void) => undefined
  ShowItemBrowser: (this: void) => undefined
  Markers: TemperWorldMarkersApi
}

declare var TemperWorld: TemperWorldApi
