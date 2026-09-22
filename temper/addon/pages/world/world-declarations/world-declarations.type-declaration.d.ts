interface TemperWorldApi {
  ADDON_NAME: string
  ADDON_VERSION: string
  toggleRDL: (this: void, extra?: string) => undefined
  ShowJournal: (this: void) => undefined
  ShowItemBrowser: (this: void) => undefined
}

declare var TemperWorld: TemperWorldApi
