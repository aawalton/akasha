import {
  asDataClass,
  asDataInstance,
  asIndexable,
  asUnknownArray,
} from "akasha/temper/addon/pages/world/collections/modules/saved-vars-casts/saved-vars-casts.module.code.ts"
import {
  enableDefaultsTrimming,
  getAccountSavedVarsActive,
  getActiveSavedVars,
  getSavedVarsManagers,
  loadAllSavedVars,
  setDebugMode,
} from "akasha/temper/addon/pages/world/collections/modules/saved-vars-data-active/saved-vars-data-active.module.code.ts"
import {
  addAccountWideToggle,
  addCharacterSettingsToggle,
  newAccountWide,
  newCharacterSettings,
} from "akasha/temper/addon/pages/world/collections/modules/saved-vars-data-constructors/saved-vars-data-constructors.module.code.ts"
import {
  getIterator,
  getLength,
} from "akasha/temper/addon/pages/world/collections/modules/saved-vars-data-iterator/saved-vars-data-iterator.module.code.ts"
import {
  migrateFrom,
  migrateFromAccountWide,
  migrateFromCharacterId,
  migrateFromCharacterName,
} from "akasha/temper/addon/pages/world/collections/modules/saved-vars-data-migrate/saved-vars-data-migrate.module.code.ts"
import {
  getLibAddonMenuAccountCheckbox,
  removeSettings,
  renameSettings,
  renameSettingsAndInvert,
  setAccountSavedVarsActive,
  version,
} from "akasha/temper/addon/pages/world/collections/modules/saved-vars-data-settings/saved-vars-data-settings.module.code.ts"
import { DATA_STATE } from "akasha/temper/addon/pages/world/collections/modules/saved-vars-data-state/saved-vars-data-state.module.code.ts"
import { SAVED_VARS } from "akasha/temper/addon/pages/world/collections/modules/saved-vars-registry/saved-vars-registry.module.code.ts"
import type {
  DataInstance,
  NextFn,
} from "akasha/temper/addon/pages/world/collections/modules/saved-vars-types/saved-vars-types.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/addon/type/lib-lua-52/lib-lua-52.type-declaration.d.ts"

const CLASSNAME = "Data"
const CLASSVERSION = 1.8

function dataIndex(this: void, data: DataInstance | undefined, key: string): unknown {
  SAVED_VARS.protected.Debug("SavedVarsData.__index(<<1>>, <<2>>)", DATA_STATE.debugMode, data, key)

  if (data === undefined) {
    return undefined
  }

  const meta = getmetatable(asDataInstance(data))
  const metaFields = asIndexable(meta)
  if (meta !== undefined && type(metaFields[key]) === "function") {
    return metaFields[key]
  }

  const savedVars = getActiveSavedVars(data, key)
  if (savedVars !== undefined) {
    const value = asIndexable(savedVars)[key]
    if (value !== undefined) {
      return value
    }
  }

  if (meta !== undefined) {
    return metaFields[key]
  }
  return undefined
}

function dataNewIndex(
  this: void,
  data: DataInstance | undefined,
  key: string,
  value: unknown
): undefined {
  SAVED_VARS.protected.Debug(
    "SavedVarsData.__newindex(<<1>>, <<2>>, <<3>>)",
    DATA_STATE.debugMode,
    data,
    key,
    value
  )

  if (data === undefined) {
    return
  }

  const savedVars = getActiveSavedVars(data, key)
  if (savedVars !== undefined) {
    asIndexable(savedVars)[key] = value
  }
}

function dataIpairs(
  this: void,
  data: DataInstance | undefined
): LuaIterable<LuaMultiReturn<[number, unknown]>> | undefined {
  SAVED_VARS.protected.Debug("SavedVarsData.__ipairs(<<1>>, <<2>>)", DATA_STATE.debugMode, data)

  if (data === undefined) {
    return undefined
  }

  const savedVars = getActiveSavedVars(data)
  if (savedVars !== undefined) {
    const rawDataTable = SAVED_VARS.lib.GetRawDataTable(savedVars)
    return ipairs(asUnknownArray(rawDataTable))
  }
  return undefined
}

function dataPairs(
  this: void,
  data: DataInstance
): LuaMultiReturn<[NextFn, DataInstance, undefined]> {
  SAVED_VARS.protected.Debug("SavedVarsData.__pairs(<<1>>)", DATA_STATE.debugMode, data)

  const [iterator, iterData] = getIterator(data)
  return $multi(iterator, asDataInstance(iterData), undefined)
}

export function installData(this: void): undefined {
  const [created] = SAVED_VARS.lib.NewClass(CLASSNAME, CLASSVERSION)
  if (created === undefined) {
    return undefined
  }

  const cls = asDataClass(created)
  const members = asIndexable(cls)
  members.NewAccountWide = newAccountWide
  members.NewCharacterSettings = newCharacterSettings
  members.AddAccountWideToggle = addAccountWideToggle
  members.AddCharacterSettingsToggle = addCharacterSettingsToggle
  members.EnableDefaultsTrimming = enableDefaultsTrimming
  members.GetAccountSavedVarsActive = getAccountSavedVarsActive
  members.GetActiveSavedVars = getActiveSavedVars
  members.GetIterator = getIterator
  members.GetLength = getLength
  members.GetLibAddonMenuAccountCheckbox = getLibAddonMenuAccountCheckbox
  members.GetSavedVarsManagers = getSavedVarsManagers
  members.LoadAllSavedVars = loadAllSavedVars
  members.MigrateFrom = migrateFrom
  members.MigrateFromAccountWide = migrateFromAccountWide
  members.MigrateFromCharacterId = migrateFromCharacterId
  members.MigrateFromCharacterName = migrateFromCharacterName
  members.RemoveSettings = removeSettings
  members.RenameSettings = renameSettings
  members.RenameSettingsAndInvert = renameSettingsAndInvert
  members.SetAccountSavedVarsActive = setAccountSavedVarsActive
  members.SetDebugMode = setDebugMode
  members.Version = version
  members.__index = dataIndex
  members.__newindex = dataNewIndex
  if (LibLua52 !== undefined) {
    members.__ipairs = dataIpairs
    members.__pairs = dataPairs
  }

  SAVED_VARS.data = cls

  DATA_STATE.emptyObject = asDataInstance(setmetatable(asDataInstance({ __dataSource: {} }), cls))

  return undefined
}
