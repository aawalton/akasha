import { toggleLeadsWindow } from "akasha/temper/addon/pages/world/antiquities/modules/leads-toggle/leads-toggle.module.code.ts"
import {
  ADDON_NAME,
  ADDON_VERSION,
} from "akasha/temper/addon/pages/world/modules/world-names/world-names.module.code.ts"
import "akasha/temper/addon/pages/world/world-declarations/world-declarations.type-declaration.d.ts"

globalThis.TemperWorld = {
  ADDON_NAME,
  ADDON_VERSION,
  toggleRDL: toggleLeadsWindow,
}
