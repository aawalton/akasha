import {
  asManagerInstance,
  asSavedVarsTable,
  asString,
  asUnknownArray,
} from "akasha/temper/addon/pages/world/collections/modules/saved-vars-casts/saved-vars-casts.module.code.ts"
import {
  SAVED_VARS_ACCOUNT_KEY,
  SAVED_VARS_CHARACTER_ID_KEY,
  SAVED_VARS_CHARACTER_NAME_KEY,
} from "akasha/temper/addon/pages/world/collections/modules/saved-vars-constants/saved-vars-constants.module.code.ts"
import { DATA_STATE } from "akasha/temper/addon/pages/world/collections/modules/saved-vars-data-state/saved-vars-data-state.module.code.ts"
import { SAVED_VARS } from "akasha/temper/addon/pages/world/collections/modules/saved-vars-registry/saved-vars-registry.module.code.ts"
import type {
  DataInstance,
  SavedVarsInfo,
  SavedVarsManagerInstance,
} from "akasha/temper/addon/pages/world/collections/modules/saved-vars-types/saved-vars-types.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

export function migrateFrom(
  this: void,
  self: DataInstance,
  fromSavedVarsInfo: SavedVarsInfo,
  copyToAllServers?: boolean
): DataInstance {
  if (fromSavedVarsInfo.keyType === undefined) {
    fromSavedVarsInfo.keyType = SAVED_VARS_CHARACTER_NAME_KEY
  }

  SAVED_VARS.protected.Debug(
    "SavedVarsData:MigrateFrom(<<1>> (<<2>>), <<3>>)",
    DATA_STATE.debugMode,
    fromSavedVarsInfo,
    asUnknownArray(fromSavedVarsInfo).length,
    copyToAllServers
  )

  let from: SavedVarsManagerInstance | undefined
  let copyAll = copyToAllServers
  const ds = self.__dataSource

  if (ds.account !== undefined) {
    SAVED_VARS.protected.Debug("ds.account block entered")
    if (copyAll === undefined) {
      copyAll = ds.account.IsProfileWorldName()
    }
    const profile = ds.account.profile
    const [to, fromResult] = SAVED_VARS.protected.MigrateToMegaserverProfiles(
      undefined,
      fromSavedVarsInfo,
      copyAll,
      ds.account
    )
    from = fromResult
    if (to !== undefined) {
      SAVED_VARS.protected.Debug(
        `Saving account saved var manager for profile ${tostring(profile)} as ${tostring(to[asString(profile)])}`,
        DATA_STATE.debugMode
      )
      ds.account = to[asString(profile)]
    } else {
      SAVED_VARS.protected.Debug("toSavedVars was nil", DATA_STATE.debugMode)
    }
  }

  if (
    ds.character !== undefined &&
    (fromSavedVarsInfo.keyType !== SAVED_VARS_ACCOUNT_KEY || !ds.defaultToAccount)
  ) {
    SAVED_VARS.protected.Debug("ds.character block entered")
    const profile = ds.character.profile
    const [to, fromResult] = SAVED_VARS.protected.MigrateToMegaserverProfiles(
      undefined,
      fromSavedVarsInfo,
      undefined,
      ds.character
    )
    from = fromResult
    if (to !== undefined) {
      SAVED_VARS.protected.Debug(
        `Saving character saved var manager as ${tostring(to[asString(profile)])}`,
        DATA_STATE.debugMode
      )
      ds.character = to[asString(profile)]
    } else {
      SAVED_VARS.protected.Debug("toSavedVars was nil", DATA_STATE.debugMode)
    }
  }

  SAVED_VARS.protected.Debug("Unsetting from raw saved vars path", DATA_STATE.debugMode)

  SAVED_VARS.protected.UnsetPath(
    asSavedVarsTable(asManagerInstance(from).table),
    asManagerInstance(from).rawSavedVarsTablePath ?? []
  )

  SAVED_VARS.protected.Debug("Migration complete.", DATA_STATE.debugMode)

  return self
}

export function migrateFromAccountWide(
  this: void,
  self: DataInstance,
  fromSavedVarsInfo: SavedVarsInfo,
  copyToAllServers?: boolean
): DataInstance {
  SAVED_VARS.protected.Debug(
    "SavedVarsData:MigrateFromAccountWide(<<1>> (<<2>>), <<3>>)",
    DATA_STATE.debugMode,
    fromSavedVarsInfo,
    asUnknownArray(fromSavedVarsInfo).length,
    copyToAllServers
  )
  fromSavedVarsInfo.keyType = SAVED_VARS_ACCOUNT_KEY
  return migrateFrom(self, fromSavedVarsInfo, copyToAllServers)
}

export function migrateFromCharacterId(
  this: void,
  self: DataInstance,
  fromSavedVarsInfo: SavedVarsInfo,
  copyToAllServers?: boolean
): DataInstance {
  SAVED_VARS.protected.Debug(
    "SavedVarsData:MigrateFromCharacterId(<<1>> (<<2>>), <<3>>)",
    DATA_STATE.debugMode,
    fromSavedVarsInfo,
    asUnknownArray(fromSavedVarsInfo).length,
    copyToAllServers
  )
  fromSavedVarsInfo.keyType = SAVED_VARS_CHARACTER_ID_KEY
  return migrateFrom(self, fromSavedVarsInfo, copyToAllServers)
}

export function migrateFromCharacterName(
  this: void,
  self: DataInstance,
  fromSavedVarsInfo: SavedVarsInfo,
  copyToAllServers?: boolean
): DataInstance {
  SAVED_VARS.protected.Debug(
    "SavedVarsData:MigrateFromCharacterName(<<1>> (<<2>>), <<3>>)",
    DATA_STATE.debugMode,
    fromSavedVarsInfo,
    asUnknownArray(fromSavedVarsInfo).length,
    copyToAllServers
  )
  fromSavedVarsInfo.keyType = SAVED_VARS_CHARACTER_NAME_KEY
  return migrateFrom(self, fromSavedVarsInfo, copyToAllServers)
}
