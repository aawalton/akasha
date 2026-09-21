import {
  ADDON_NAME,
  ADDON_VERSION,
} from "akasha/temper/addon/housing-addon/modules/housing-addon-names/housing-addon-names.module.code.ts"
import "akasha/temper/addon/housing-addon/housing-publish-declarations/housing-publish-declarations.type-declaration.d.ts"

export interface TemperHousingApi {
  ADDON_NAME: typeof ADDON_NAME
  ADDON_VERSION: typeof ADDON_VERSION
}

globalThis.TemperHousing = {
  ADDON_NAME,
  ADDON_VERSION,
}
