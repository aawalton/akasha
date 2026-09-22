import {
  asIndexable,
  asProtected,
  asSavedVarsLibTable,
  asSavedVarsTable,
  asStringArray,
} from "akasha/temper/addon/pages/world/collections/modules/saved-vars-casts/saved-vars-casts.module.code.ts"
import {
  SAVED_VARS_ACCOUNT_KEY,
  SAVED_VARS_CHARACTER_ID_KEY,
  SAVED_VARS_CHARACTER_NAME_KEY,
  SAVED_VARS_VERSION,
} from "akasha/temper/addon/pages/world/collections/modules/saved-vars-constants/saved-vars-constants.module.code.ts"
import { LIB_STATE } from "akasha/temper/addon/pages/world/collections/modules/saved-vars-lib-state/saved-vars-lib-state.module.code.ts"
import { SAVED_VARS } from "akasha/temper/addon/pages/world/collections/modules/saved-vars-registry/saved-vars-registry.module.code.ts"
import type {
  AccountAndProfile,
  DataInstance,
  ProtectedTable,
  RegisteredSavedVarsInfo,
  SavedVarsInfo,
  SavedVarsLibTable,
  SavedVarsManagerInstance,
  SavedVarsTable,
} from "akasha/temper/addon/pages/world/collections/modules/saved-vars-types/saved-vars-types.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"

const WORLDS: { live: string[]; pts: string[] } = {
  live: ["NA Megaserver", "EU Megaserver"],
  pts: ["PTS"],
}

const CLASS_VERSIONS: Record<string, number> = {}

function getRawDataTable(this: void, _self: SavedVarsLibTable, savedVars: unknown): SavedVarsTable {
  const meta = getmetatable(asSavedVarsTable(savedVars))
  if (meta !== undefined) {
    const index = asIndexable(meta).__index
    if (index !== undefined && index !== false) {
      return asSavedVarsTable(index)
    }
  }
  return asSavedVarsTable(savedVars)
}

function clearSavedVars(this: void, self: SavedVarsLibTable, savedVars: unknown): undefined {
  const dataTable = getRawDataTable(self, savedVars)
  const writable = asIndexable(savedVars)
  for (const [key, value] of pairs(dataTable)) {
    if (key !== "version" && type(value) !== "function") {
      writable[key] = undefined
    }
  }
}

function deepSavedVarsCopy(
  this: void,
  self: SavedVarsLibTable,
  source: unknown,
  destination: unknown,
  doNotOverwrite?: boolean
): undefined {
  const src = getRawDataTable(self, source)
  const dest = getRawDataTable(self, destination)
  for (const [key, value] of pairs(src)) {
    if (type(value) === "table") {
      if (type(dest[key]) !== "table") {
        dest[key] = {}
      }
      deepSavedVarsCopy(self, value, dest[key], doNotOverwrite)
    } else if (key !== "version" && type(value) !== "function") {
      if (doNotOverwrite !== true || dest[key] === undefined) {
        dest[key] = value
      }
    }
  }
}

function getAccountsAndProfiles(
  this: void,
  _self: SavedVarsLibTable,
  savedVarName: string
): AccountAndProfile[] {
  const savedVariableTable = asIndexable(_G)[savedVarName]
  if (type(savedVariableTable) !== "table") {
    error("Can only apply saved variables to a table")
  }
  const accountsAndProfiles: AccountAndProfile[] = []
  for (const [key1, value1] of pairs(asSavedVarsTable(savedVariableTable))) {
    if (type(value1) === "table") {
      if (string.sub(key1, 1, 1) === "@") {
        accountsAndProfiles.push({ account: key1 })
      } else {
        for (const [key2, value2] of pairs(asSavedVarsTable(value1))) {
          if (type(value2) === "table" && string.sub(key1, 1, 1) === "@") {
            accountsAndProfiles.push({ account: key2, profile: key1 })
          }
        }
      }
    }
  }
  return accountsAndProfiles
}

function getInfo(
  this: void,
  _self: SavedVarsLibTable,
  savedVars: unknown
): RegisteredSavedVarsInfo | undefined {
  if (savedVars === undefined) {
    return undefined
  }
  return LIB_STATE.savedVarRegistry.get(asSavedVarsTable(savedVars))
}

function getWorldNames(this: void, _self: SavedVarsLibTable, environment?: string): string[] {
  if (environment === "*") {
    return [...WORLDS.live, ...WORLDS.pts]
  }
  let env = environment
  if (env === undefined) {
    env = GetWorldName() === "PTS" ? "pts" : "live"
  }
  return asStringArray(asIndexable(WORLDS)[env])
}

function isZoSavedVars(this: void, _self: SavedVarsLibTable, input: unknown): boolean {
  return type(input) === "table" && type(asIndexable(input).GetInterfaceForCharacter) === "function"
}

function migrate(
  this: void,
  _self: SavedVarsLibTable,
  defaultKeyType: number | SavedVarsInfo | undefined,
  fromSavedVarsInfo: SavedVarsInfo,
  toSavedVarsInfo1?: SavedVarsInfo,
  ...rest: SavedVarsInfo[]
): SavedVarsManagerInstance[] | undefined {
  const [toParams, from] = SAVED_VARS.protected.Migrate(
    defaultKeyType,
    fromSavedVarsInfo,
    toSavedVarsInfo1,
    ...rest
  )
  SAVED_VARS.protected.UnsetPath(asSavedVarsTable(from.table), from.rawSavedVarsTablePath ?? [])
  return toParams
}

function migrateAccountWide(
  this: void,
  self: SavedVarsLibTable,
  fromSavedVarsInfo: SavedVarsInfo,
  toSavedVarsInfo1?: SavedVarsInfo,
  ...rest: SavedVarsInfo[]
): SavedVarsManagerInstance[] | undefined {
  return migrate(self, SAVED_VARS_ACCOUNT_KEY, fromSavedVarsInfo, toSavedVarsInfo1, ...rest)
}

function migrateCharacterId(
  this: void,
  self: SavedVarsLibTable,
  fromSavedVarsInfo: SavedVarsInfo,
  toSavedVarsInfo1?: SavedVarsInfo,
  ...rest: SavedVarsInfo[]
): SavedVarsManagerInstance[] | undefined {
  return migrate(self, SAVED_VARS_CHARACTER_ID_KEY, fromSavedVarsInfo, toSavedVarsInfo1, ...rest)
}

function migrateCharacterName(
  this: void,
  self: SavedVarsLibTable,
  fromSavedVarsInfo: SavedVarsInfo,
  toSavedVarsInfo1?: SavedVarsInfo,
  ...rest: SavedVarsInfo[]
): SavedVarsManagerInstance[] | undefined {
  return migrate(self, SAVED_VARS_CHARACTER_NAME_KEY, fromSavedVarsInfo, toSavedVarsInfo1, ...rest)
}

function migrateCharacterNameToId(
  this: void,
  self: SavedVarsLibTable,
  fromSavedVarsInfo: SavedVarsInfo,
  toSavedVarsInfo1?: SavedVarsInfo,
  ...rest: SavedVarsInfo[]
): SavedVarsManagerInstance[] | undefined {
  fromSavedVarsInfo.keyType = SAVED_VARS_CHARACTER_NAME_KEY
  return migrate(self, SAVED_VARS_CHARACTER_ID_KEY, fromSavedVarsInfo, toSavedVarsInfo1, ...rest)
}

function migrateToMegaserverProfiles(
  this: void,
  _self: SavedVarsLibTable,
  defaultKeyType: number | undefined,
  fromSavedVarsInfo: SavedVarsInfo,
  copyToAllServers: boolean | undefined,
  toSavedVarsInfo: SavedVarsInfo | undefined
): Record<string, SavedVarsManagerInstance> | undefined {
  const [toParams, from] = SAVED_VARS.protected.MigrateToMegaserverProfiles(
    defaultKeyType,
    fromSavedVarsInfo,
    copyToAllServers,
    toSavedVarsInfo
  )
  SAVED_VARS.protected.UnsetPath(asSavedVarsTable(from.table), from.rawSavedVarsTablePath ?? [])
  return toParams
}

function newAccountWide(
  this: void,
  _self: SavedVarsLibTable,
  savedVariableTable: string,
  version?: number | string | SavedVarsTable,
  namespace?: string | SavedVarsTable,
  defaults?: SavedVarsTable,
  profile?: string,
  displayName?: string
): DataInstance {
  return SAVED_VARS.data.NewAccountWide(
    savedVariableTable,
    version,
    namespace,
    defaults,
    profile,
    displayName
  )
}

function newCharacterSettings(
  this: void,
  _self: SavedVarsLibTable,
  savedVariableTable: string,
  version?: number | string | SavedVarsTable,
  namespace?: string | SavedVarsTable,
  defaults?: SavedVarsTable,
  profile?: string,
  displayName?: string,
  characterName?: string,
  characterId?: number | string,
  characterKeyType?: number
): DataInstance {
  return SAVED_VARS.data.NewCharacterSettings(
    savedVariableTable,
    version,
    namespace,
    defaults,
    profile,
    displayName,
    characterName,
    characterId,
    characterKeyType
  )
}

function setDebugMode(this: void, _self: SavedVarsLibTable, enable: boolean): undefined {
  SAVED_VARS.protected.SetDebugMode(enable)
}

function newClass(
  this: void,
  _self: SavedVarsLibTable,
  name: string,
  version: number
): LuaMultiReturn<[SavedVarsTable | undefined, ProtectedTable | undefined]> {
  const existing = CLASS_VERSIONS[name]
  if (existing === undefined || existing < version) {
    CLASS_VERSIONS[name] = version
    const created: SavedVarsTable = {}
    if (name === "Protected") {
      return $multi(created, asProtected(created))
    }
    return $multi(created, SAVED_VARS.protected)
  }
  return $multi(undefined, undefined)
}

export function newAccountWideSavedVars(
  this: void,
  savedVariableTable: string,
  defaults: SavedVarsTable
): DataInstance {
  return SAVED_VARS.lib.NewAccountWide(savedVariableTable, defaults)
}

export function installLibCore(this: void): undefined {
  const libTable = asSavedVarsLibTable({ version: SAVED_VARS_VERSION })
  const members = asIndexable(libTable)
  members.ClearSavedVars = clearSavedVars
  members.DeepSavedVarsCopy = deepSavedVarsCopy
  members.GetAccountsAndProfiles = getAccountsAndProfiles
  members.GetInfo = getInfo
  members.GetRawDataTable = getRawDataTable
  members.GetWorldNames = getWorldNames
  members.IsZOSavedVars = isZoSavedVars
  members.Migrate = migrate
  members.MigrateAccountWide = migrateAccountWide
  members.MigrateCharacterId = migrateCharacterId
  members.MigrateCharacterName = migrateCharacterName
  members.MigrateCharacterNameToId = migrateCharacterNameToId
  members.MigrateToMegaserverProfiles = migrateToMegaserverProfiles
  members.NewAccountWide = newAccountWide
  members.NewCharacterSettings = newCharacterSettings
  members.NewCharacterIdSettings = newCharacterSettings
  members.NewClass = newClass
  members.SetDebugMode = setDebugMode

  SAVED_VARS.lib = libTable
  return undefined
}
