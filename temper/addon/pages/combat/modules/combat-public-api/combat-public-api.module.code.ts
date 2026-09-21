import {
  ADDON_NAME,
  ADDON_VERSION,
} from "akasha/temper/addon/pages/combat/modules/combat-constants/combat-constants.module.code.ts"
import "akasha/temper/addon/pages/combat/combat-public-api-declarations/combat-public-api-declarations.type-declaration.d.ts"

globalThis.TemperCombat = {
  name: ADDON_NAME,
  version: ADDON_VERSION,
}
