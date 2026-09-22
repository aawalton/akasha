import {
  DEFAULTS,
  fillGuildDefaults,
  type QuietSettings,
} from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-defaults/quiet-defaults.module.code.ts"
import { SAVED_VARIABLES_NAME } from "akasha/temper/addon/pages/temper-core/temper-interface/modules/quiet-identity/quiet-identity.module.code.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"

let savedVarsInstance: QuietSettings | undefined

export function initializeSavedVariables(this: void): QuietSettings {
  fillGuildDefaults()
  savedVarsInstance = ZO_SavedVars.NewAccountWide<QuietSettings>(
    SAVED_VARIABLES_NAME,
    2,
    undefined,
    DEFAULTS
  )
  return savedVarsInstance
}

export function getSavedVariables(this: void): QuietSettings {
  if (savedVarsInstance === undefined) {
    throw new Error("TemperQuiet saved variables not initialized")
  }
  return savedVarsInstance
}
