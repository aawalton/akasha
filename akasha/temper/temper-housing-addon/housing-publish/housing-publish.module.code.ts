import {
  ADDON_NAME,
  ADDON_VERSION,
} from "../housing-addon-names/housing-addon-names.module.code.ts"

export interface TemperHousingApi {
  ADDON_NAME: typeof ADDON_NAME
  ADDON_VERSION: typeof ADDON_VERSION
}

declare global {
  var TemperHousing: TemperHousingApi
}

globalThis.TemperHousing = {
  ADDON_NAME,
  ADDON_VERSION,
}
