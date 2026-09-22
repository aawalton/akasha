import {
  ADDON_NAME,
  ADDON_VERSION,
} from "akasha/temper/addon/pages/world/modules/navigation-names/navigation-names.module.code.ts"
import "akasha/temper/addon/pages/world/navigation-declarations/navigation-declarations.type-declaration.d.ts"

export interface TemperNavigationApi {
  ADDON_NAME: typeof ADDON_NAME
  ADDON_VERSION: typeof ADDON_VERSION
}

globalThis.TemperNavigation = {
  ADDON_NAME,
  ADDON_VERSION,
}
