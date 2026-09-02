import { ADDON_NAME, ADDON_VERSION } from "../events-addon-names/events-addon-names.module.code.ts"

export interface TemperEventsApi {
  ADDON_NAME: typeof ADDON_NAME
  ADDON_VERSION: typeof ADDON_VERSION
}

declare global {
  var TemperEvents: TemperEventsApi
}

globalThis.TemperEvents = {
  ADDON_NAME,
  ADDON_VERSION,
}
