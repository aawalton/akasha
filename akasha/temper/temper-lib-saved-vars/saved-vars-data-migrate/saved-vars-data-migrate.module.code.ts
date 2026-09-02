import {
  asLsvTable,
  asManagerInstance,
  asString,
  asUnknownArray,
} from "../saved-vars-casts/saved-vars-casts.module.code.ts"
import {
  LIBSAVEDVARS_ACCOUNT_KEY,
  LIBSAVEDVARS_CHARACTER_ID_KEY,
  LIBSAVEDVARS_CHARACTER_NAME_KEY,
} from "../saved-vars-constants/saved-vars-constants.module.code.ts"
import { DATA_STATE } from "../saved-vars-data-state/saved-vars-data-state.module.code.ts"
import { LSV } from "../saved-vars-registry/saved-vars-registry.module.code.ts"
import type {
  DataInstance,
  SavedVarsInfo,
  SavedVarsManagerInstance,
} from "../saved-vars-types/saved-vars-types.module.code.ts"

export function migrateFrom(
  this: void,
  self: DataInstance,
  fromSavedVarsInfo: SavedVarsInfo,
  copyToAllServers?: boolean
): DataInstance {
  if (fromSavedVarsInfo.keyType === undefined) {
    fromSavedVarsInfo.keyType = LIBSAVEDVARS_CHARACTER_NAME_KEY
  }

  LSV.protected.Debug(
    "LSV_Data:MigrateFrom(<<1>> (<<2>>), <<3>>)",
    DATA_STATE.debugMode,
    fromSavedVarsInfo,
    asUnknownArray(fromSavedVarsInfo).length,
    copyToAllServers
  )

  let from: SavedVarsManagerInstance | undefined
  let copyAll = copyToAllServers
  const ds = self.__dataSource

  if (ds.account !== undefined) {
    LSV.protected.Debug("ds.account block entered")
    if (copyAll === undefined) {
      copyAll = ds.account.IsProfileWorldName()
    }
    const profile = ds.account.profile
    const [to, fromResult] = LSV.protected.MigrateToMegaserverProfiles(
      undefined,
      fromSavedVarsInfo,
      copyAll,
      ds.account
    )
    from = fromResult
    if (to !== undefined) {
      LSV.protected.Debug(
        `Saving account saved var manager for profile ${tostring(profile)} as ${tostring(to[asString(profile)])}`,
        DATA_STATE.debugMode
      )
      ds.account = to[asString(profile)]
    } else {
      LSV.protected.Debug("toSavedVars was nil", DATA_STATE.debugMode)
    }
  }

  if (
    ds.character !== undefined &&
    (fromSavedVarsInfo.keyType !== LIBSAVEDVARS_ACCOUNT_KEY || !ds.defaultToAccount)
  ) {
    LSV.protected.Debug("ds.character block entered")
    const profile = ds.character.profile
    const [to, fromResult] = LSV.protected.MigrateToMegaserverProfiles(
      undefined,
      fromSavedVarsInfo,
      undefined,
      ds.character
    )
    from = fromResult
    if (to !== undefined) {
      LSV.protected.Debug(
        `Saving character saved var manager as ${tostring(to[asString(profile)])}`,
        DATA_STATE.debugMode
      )
      ds.character = to[asString(profile)]
    } else {
      LSV.protected.Debug("toSavedVars was nil", DATA_STATE.debugMode)
    }
  }

  LSV.protected.Debug("Unsetting from raw saved vars path", DATA_STATE.debugMode)

  LSV.protected.UnsetPath(
    asLsvTable(asManagerInstance(from).table),
    asManagerInstance(from).rawSavedVarsTablePath ?? []
  )

  LSV.protected.Debug("Migration complete.", DATA_STATE.debugMode)

  return self
}

export function migrateFromAccountWide(
  this: void,
  self: DataInstance,
  fromSavedVarsInfo: SavedVarsInfo,
  copyToAllServers?: boolean
): DataInstance {
  LSV.protected.Debug(
    "LSV_Data:MigrateFromAccountWide(<<1>> (<<2>>), <<3>>)",
    DATA_STATE.debugMode,
    fromSavedVarsInfo,
    asUnknownArray(fromSavedVarsInfo).length,
    copyToAllServers
  )
  fromSavedVarsInfo.keyType = LIBSAVEDVARS_ACCOUNT_KEY
  return migrateFrom(self, fromSavedVarsInfo, copyToAllServers)
}

export function migrateFromCharacterId(
  this: void,
  self: DataInstance,
  fromSavedVarsInfo: SavedVarsInfo,
  copyToAllServers?: boolean
): DataInstance {
  LSV.protected.Debug(
    "LSV_Data:MigrateFromCharacterId(<<1>> (<<2>>), <<3>>)",
    DATA_STATE.debugMode,
    fromSavedVarsInfo,
    asUnknownArray(fromSavedVarsInfo).length,
    copyToAllServers
  )
  fromSavedVarsInfo.keyType = LIBSAVEDVARS_CHARACTER_ID_KEY
  return migrateFrom(self, fromSavedVarsInfo, copyToAllServers)
}

export function migrateFromCharacterName(
  this: void,
  self: DataInstance,
  fromSavedVarsInfo: SavedVarsInfo,
  copyToAllServers?: boolean
): DataInstance {
  LSV.protected.Debug(
    "LSV_Data:MigrateFromCharacterName(<<1>> (<<2>>), <<3>>)",
    DATA_STATE.debugMode,
    fromSavedVarsInfo,
    asUnknownArray(fromSavedVarsInfo).length,
    copyToAllServers
  )
  fromSavedVarsInfo.keyType = LIBSAVEDVARS_CHARACTER_NAME_KEY
  return migrateFrom(self, fromSavedVarsInfo, copyToAllServers)
}
