import {
  ADDON_NAME,
  ADDON_VERSION,
} from "akasha/temper/addon/pages/items/crafting-station/modules/writ-constants/writ-constants.module.code.ts"
import "akasha/temper/addon/pages/items/crafting-station/writ-global/writ-global.type-declaration.d.ts"

interface WritGlobalTable {
  TemperWrit: TemperWritGlobal
}

function asGlobalTable(this: void, value: unknown): WritGlobalTable {
  return value as WritGlobalTable
}

asGlobalTable(globalThis).TemperWrit = {
  name: ADDON_NAME,
  version: ADDON_VERSION,
}
