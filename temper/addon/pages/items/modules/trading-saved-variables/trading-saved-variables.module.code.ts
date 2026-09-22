import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import { SAVED_VARIABLES_NAME } from "akasha/temper/addon/pages/items/modules/trading-constants/trading-constants.module.code.ts"
import {
  type GuildSnapshot,
  SAVED_VARIABLES_DEFAULTS,
  type SavedVariablesData,
} from "akasha/temper/addon/pages/items/modules/trading-types/trading-types.module.code.ts"
import { requireSavedVariables } from "akasha/temper/addon/shared/narrow/modules/require-saved-variables/require-saved-variables.module.code.ts"
export let savedVarsInstance: SavedVariablesData | undefined

export function initializeSavedVariables(): SavedVariablesData {
  savedVarsInstance = ZO_SavedVars.NewAccountWide(
    SAVED_VARIABLES_NAME,
    1,
    undefined,
    SAVED_VARIABLES_DEFAULTS
  )

  savedVarsInstance.displayName = GetDisplayName()
  savedVarsInstance.worldName = GetWorldName()

  return savedVarsInstance
}

export function getSavedVariables(): SavedVariablesData {
  return requireSavedVariables(savedVarsInstance)
}

export function ensureGuild(guildName: string, kioskName: string): GuildSnapshot {
  const sv = getSavedVariables()
  if (!sv.guilds[guildName]) {
    sv.guilds[guildName] = {
      guildName: guildName,
      kioskName: kioskName,
      listings: {},
    }
  }
  sv.guilds[guildName].kioskName = kioskName
  return sv.guilds[guildName]
}
