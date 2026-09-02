import { ADDON_NAME, ADDON_VERSION } from "../writ-constants/writ-constants.module.code.ts"
import type { TemperWritGlobal } from "../writ-writworthy-global/writ-writworthy-global.module.code.ts"

declare global {
  var TemperWrit: TemperWritGlobal
}

globalThis.TemperWrit = {
  name: ADDON_NAME,
  version: ADDON_VERSION,
}
