import {
  ADDON_NAME,
  ADDON_VERSION,
} from "akasha/temper/addon/navigation-addon/modules/map-pins-names/map-pins-names.module.code.ts"
import "akasha/temper/addon/navigation-addon/navigation-declarations/navigation-declarations.type-declaration.d.ts"

export interface TemperMapPinsApi {
  ADDON_NAME: typeof ADDON_NAME
  ADDON_VERSION: typeof ADDON_VERSION
}

globalThis.TemperMapPins = {
  ADDON_NAME,
  ADDON_VERSION,
}
