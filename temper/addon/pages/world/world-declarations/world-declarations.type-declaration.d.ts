interface TemperWorldApi {
  ADDON_NAME: string
  ADDON_VERSION: string
  toggleRDL: (this: void, extra?: string) => undefined
}

declare var TemperWorld: TemperWorldApi
