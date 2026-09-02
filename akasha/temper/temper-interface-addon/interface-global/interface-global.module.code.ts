import { ADDON_NAME, ADDON_VERSION } from "../interface-identity/interface-identity.module.code.ts"

export interface TemperInterfaceApi {
  ADDON_NAME: typeof ADDON_NAME
  ADDON_VERSION: typeof ADDON_VERSION
}

declare global {
  var TemperInterface: TemperInterfaceApi
}

globalThis.TemperInterface = {
  ADDON_NAME,
  ADDON_VERSION,
}
