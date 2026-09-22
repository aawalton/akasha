import {
  asCallbackManagerExt,
  asIndexable,
  asManagerInstance,
  asSavedVarsTable,
  asSavedVarsWritable,
  asString,
  asTable,
} from "akasha/temper/addon/pages/collections/modules/saved-vars-casts/saved-vars-casts.module.code.ts"
import {
  SAVED_VARS_ACCOUNT_KEY,
  SAVED_VARS_CHARACTER_NAME_KEY,
  SAVED_VARS_NAME,
} from "akasha/temper/addon/pages/collections/modules/saved-vars-constants/saved-vars-constants.module.code.ts"
import { MANAGER_STATE } from "akasha/temper/addon/pages/collections/modules/saved-vars-manager-state/saved-vars-manager-state.module.code.ts"
import { SAVED_VARS } from "akasha/temper/addon/pages/collections/modules/saved-vars-registry/saved-vars-registry.module.code.ts"
import type {
  SavedVarsInfo,
  SavedVarsManagerClass,
  SavedVarsManagerInstance,
  SavedVarsTable,
} from "akasha/temper/addon/pages/collections/modules/saved-vars-types/saved-vars-types.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

const MIGRATE_START_CALLBACK_NAME = `${SAVED_VARS_NAME}MigrateStart`
const LAZY_LOAD_CALLBACK_NAME = `${SAVED_VARS_NAME}LazyLoad`

const DEBUG_MODE = false

const cm = asCallbackManagerExt(CALLBACK_MANAGER)
const sv = asSavedVarsWritable(ZO_SavedVars)

export function enableDefaultsTrimming(this: void, self: SavedVarsManagerInstance): undefined {
  self.isDefaultsTrimmingEnabled = true
}

export function isProfileWorldName(this: void, self: SavedVarsManagerInstance): boolean {
  const result = ZO_IsElementInNumericallyIndexedTable(SAVED_VARS.lib.GetWorldNames(), self.profile)
  SAVED_VARS.protected.Debug(
    `SavedVarsManager:IsProfileWorldName() == ${tostring(result)} (self.profile==${tostring(self.profile)})`,
    DEBUG_MODE
  )
  return result
}

export function fireMigrateStartCallbacks(this: void, self: SavedVarsManagerInstance): undefined {
  const scope = `${MIGRATE_START_CALLBACK_NAME}${self.id}`
  SAVED_VARS.protected.Debug(
    `SavedVarsManager:FireMigrateStartCallbacks() scope=${scope}`,
    DEBUG_MODE
  )
  const params = MANAGER_STATE.extraMigrateParams[self.id]
  const [rawSavedVarsTable] = loadRawTableData(self)
  cm.FireCallbacks(scope, rawSavedVarsTable, ...(params ?? []))
  unregisterAllMigrateStartCallbacks(self)
}

export function loadRawTableData(
  this: void,
  self: SavedVarsManagerInstance
): LuaMultiReturn<
  [SavedVarsTable | undefined, SavedVarsTable | undefined, unknown, unknown[] | undefined]
> {
  SAVED_VARS.protected.Debug("SavedVarsManager:LoadRawTableData()", DEBUG_MODE)

  if (
    self.rawSavedVarsTable !== undefined &&
    self.rawSavedVarsTableParent !== undefined &&
    self.rawSavedVarsTableKey !== undefined &&
    self.rawSavedVarsTablePath !== undefined
  ) {
    return $multi(
      self.rawSavedVarsTable,
      self.rawSavedVarsTableParent,
      self.rawSavedVarsTableKey,
      self.rawSavedVarsTablePath
    )
  }

  if (self.table === undefined) {
    validate(self)
  }

  if (self.keyType === SAVED_VARS_ACCOUNT_KEY) {
    const [t, parent, key, , path] = SAVED_VARS.protected.GetSavedVarsTable(
      asString(self.name),
      self.namespace,
      self.profile,
      self.displayName
    )
    self.rawSavedVarsTable = t
    self.rawSavedVarsTableParent = parent
    self.rawSavedVarsTableKey = key
    self.rawSavedVarsTablePath = path
  } else {
    const [t, parent, key, , path] = SAVED_VARS.protected.GetSavedVarsTable(
      asString(self.name),
      self.namespace,
      self.profile,
      self.displayName,
      self.characterName,
      self.characterId,
      self.keyType
    )
    self.rawSavedVarsTable = t
    self.rawSavedVarsTableParent = parent
    self.rawSavedVarsTableKey = key
    self.rawSavedVarsTablePath = path
  }

  return $multi(
    self.rawSavedVarsTable,
    self.rawSavedVarsTableParent,
    self.rawSavedVarsTableKey,
    self.rawSavedVarsTablePath
  )
}

export function setDebugMode(
  this: void,
  _self: SavedVarsManagerInstance,
  enable: boolean
): undefined {
  SAVED_VARS.protected.SetDebugMode(enable)
}

export function validate(
  this: void,
  self: SavedVarsManagerInstance
): LuaMultiReturn<[boolean, SavedVarsManagerInstance]> {
  SAVED_VARS.protected.Debug("SavedVarsManager:Validate()", DEBUG_MODE)

  if (rawget(self, "table") !== undefined) {
    return $multi(true, self)
  }

  const [tableValid, savedVarsTable] = pcall(
    SAVED_VARS.protected.ValidateSavedVarsTable,
    asString(rawget(self, "name"))
  )

  if (!tableValid) {
    error("Invalid saved vars table specified in field 'name'.")
  }

  SAVED_VARS.protected.Debug(
    `Setting 'table' field of SavedVarsManager ${tostring(self)} to ${tostring(savedVarsTable)}`,
    DEBUG_MODE
  )
  rawset(self, "table", asSavedVarsTable(savedVarsTable))

  return $multi(true, self)
}

export function managerIndex(this: void, manager: SavedVarsManagerInstance, key: unknown): unknown {
  if (key !== "savedVars") {
    return asIndexable(SAVED_VARS.manager)[asString(key)]
  }

  if (rawget(manager, "table") === undefined) {
    validate(manager)
  }

  const pendingVersion = rawget(manager, "pendingVersion")
  if (pendingVersion !== undefined) {
    const [rawSavedVarsTable] = loadRawTableData(manager)
    if (rawSavedVarsTable !== undefined) {
      rawSavedVarsTable["version"] = pendingVersion
    }
    rawset(manager, "pendingVersion", undefined)
    MANAGER_STATE.versionUpdateQueue[manager.id] = undefined
  }

  let savedVars: SavedVarsTable
  if (rawget(manager, "keyType") === SAVED_VARS_ACCOUNT_KEY) {
    SAVED_VARS.protected.Debug("Lazy loading new account wide saved vars.", DEBUG_MODE)
    savedVars = sv.NewAccountWide(
      asString(rawget(manager, "name")),
      rawget(manager, "version") ?? 1,
      rawget(manager, "namespace"),
      rawget(manager, "defaults"),
      rawget(manager, "profile"),
      rawget(manager, "displayName")
    )
  } else {
    SAVED_VARS.protected.Debug("Lazy loading new character-specific saved vars.", DEBUG_MODE)
    savedVars = sv.New(
      asString(rawget(manager, "name")),
      rawget(manager, "version") ?? 1,
      rawget(manager, "namespace"),
      rawget(manager, "defaults"),
      rawget(manager, "profile"),
      rawget(manager, "displayName"),
      rawget(manager, "characterName"),
      rawget(manager, "characterId"),
      rawget(manager, "keyType")
    )
  }

  rawset(manager, "savedVars", savedVars)
  fireLazyLoadCallbacks(manager)

  return savedVars
}

export function newManager(
  this: void,
  self: SavedVarsManagerClass,
  data: SavedVarsInfo
): SavedVarsManagerInstance {
  const manager = asManagerInstance({
    id: MANAGER_STATE.nextId,
    name: data.name,
    keyType: data.keyType ?? SAVED_VARS_CHARACTER_NAME_KEY,
    version: data.version ?? 1,
    defaults: data.defaults ?? {},
    trimDefaults: data.trimDefaults ?? data.defaults ?? {},
    namespace: data.namespace,
    profile: data.profile,
    displayName: data.displayName ?? GetDisplayName(),
    table: data.table,
    rawSavedVarsTable: data.rawSavedVarsTable,
    rawSavedVarsTableParent: data.rawSavedVarsTableParent,
    rawSavedVarsTableKey: data.rawSavedVarsTableKey,
    rawSavedVarsTablePath: data.rawSavedVarsTablePath,
  })
  if (manager.keyType !== SAVED_VARS_ACCOUNT_KEY) {
    manager.characterName = data.characterName ?? GetUnitName("player")
    manager.characterId = data.characterId ?? GetCurrentCharacterId()
  }

  setmetatable(manager, self)

  SAVED_VARS.protected.Debug(
    `SavedVarsManager:New() returning ${tostring(manager)} with [table] field = ${tostring(manager.table)}`,
    DEBUG_MODE
  )
  MANAGER_STATE.registry[MANAGER_STATE.nextId] = manager

  MANAGER_STATE.nextId = MANAGER_STATE.nextId + 1

  return manager
}

function fillDefaults(
  this: void,
  tbl: SavedVarsTable | undefined,
  defaults: SavedVarsTable | undefined
): undefined {
  if (tbl === undefined || type(tbl) !== "table" || defaults === undefined) {
    return
  }
  SAVED_VARS.protected.Debug(
    "SavedVarsManager.fillDefaults(<<1>>, <<2>>)",
    DEBUG_MODE,
    tbl,
    defaults
  )
  for (const [key, defaultValue] of pairs(defaults)) {
    if (type(defaultValue) === "table") {
      if (tbl[key] === undefined) {
        tbl[key] = {}
      }
      fillDefaults(asSavedVarsTable(tbl[key]), asSavedVarsTable(defaultValue))
    } else if (tbl[key] === undefined) {
      tbl[key] = defaultValue
    }
  }
}

function fireLazyLoadCallbacks(this: void, self: SavedVarsManagerInstance): undefined {
  const scope = `${LAZY_LOAD_CALLBACK_NAME}${self.id}`
  SAVED_VARS.protected.Debug(`SavedVarsManager:fireLazyLoadCallbacks() scope=${scope}`, DEBUG_MODE)
  const params = MANAGER_STATE.extraLazyLoadParams[self.id]
  cm.FireCallbacks(scope, ...(params ?? []))
  unregisterAllLazyLoadCallbacks(self)
}

export function onLogout(this: void): undefined {
  SAVED_VARS.protected.Debug("SavedVarsManager.onLogout()", DEBUG_MODE)
  for (const [, savedVarsManager] of pairs(MANAGER_STATE.versionUpdateQueue)) {
    const [rawDataTable] = loadRawTableData(savedVarsManager)
    const pendingVersion = rawget(savedVarsManager, "pendingVersion")
    if (pendingVersion !== undefined) {
      if (rawDataTable !== undefined) {
        rawDataTable["version"] = pendingVersion
      }
      rawset(savedVarsManager, "pendingVersion", undefined)
    }
  }
  MANAGER_STATE.versionUpdateQueue = {}

  for (const [, savedVarsManager] of pairs(MANAGER_STATE.registry)) {
    if (savedVarsManager.isDefaultsTrimmingEnabled) {
      const [rawDataTable, , , rawSavedVarsTablePath] = loadRawTableData(savedVarsManager)
      const defaults = savedVarsManager.trimDefaults
      if (rawDataTable !== undefined && defaults !== undefined) {
        trimDefaults(rawDataTable, defaults)
        let nextKey: unknown
        do {
          const [nk] = next(rawDataTable, nextKey)
          nextKey = nk
        } while (nextKey === "version" || nextKey === "$LastCharacterName")
        if (nextKey === undefined) {
          rawDataTable["version"] = undefined
          rawDataTable["$LastCharacterName"] = undefined
          SAVED_VARS.protected.UnsetPath(
            asSavedVarsTable(savedVarsManager.table),
            rawSavedVarsTablePath ?? []
          )
        }
      }
    }
  }
}

export function onLogoutCanceled(this: void): undefined {
  SAVED_VARS.protected.Debug("SavedVarsManager.onLogoutCanceled()", DEBUG_MODE)
  for (const [, savedVarsManager] of pairs(MANAGER_STATE.registry)) {
    if (savedVarsManager.isDefaultsTrimmingEnabled) {
      const [rawDataTable] = loadRawTableData(savedVarsManager)
      const defaults = savedVarsManager.trimDefaults
      if (rawDataTable !== undefined && defaults !== undefined) {
        fillDefaults(rawDataTable, defaults)
      }
    }
  }
}

function trimDefaults(
  this: void,
  tbl: SavedVarsTable | undefined,
  defaults: SavedVarsTable | undefined
): undefined {
  if (tbl === undefined || type(tbl) !== "table" || defaults === undefined) {
    return
  }
  for (const [key, defaultValue] of pairs(defaults)) {
    if (type(defaultValue) === "table") {
      if (type(tbl[key]) === "table") {
        trimDefaults(asSavedVarsTable(tbl[key]), asSavedVarsTable(defaultValue))
        const child = tbl[key]
        if (child !== undefined) {
          const [firstKey] = next(asTable(child))
          if (firstKey === undefined) {
            tbl[key] = undefined
          }
        }
      }
    } else if (tbl[key] === defaultValue) {
      tbl[key] = undefined
    }
  }
}

function unregisterAllLazyLoadCallbacks(this: void, self: SavedVarsManagerInstance): undefined {
  const scope = `${LAZY_LOAD_CALLBACK_NAME}${self.id}`
  SAVED_VARS.protected.Debug(
    `SavedVarsManager:unregisterAllLazyLoadCallbacks() scope=${scope}`,
    DEBUG_MODE
  )
  cm.UnregisterAllCallbacks(scope)
  MANAGER_STATE.extraLazyLoadParams[self.id] = undefined
}

function unregisterAllMigrateStartCallbacks(this: void, self: SavedVarsManagerInstance): undefined {
  const scope = `${MIGRATE_START_CALLBACK_NAME}${self.id}`
  SAVED_VARS.protected.Debug(
    `SavedVarsManager:unregisterAllMigrateStartCallbacks() scope=${scope}`,
    DEBUG_MODE
  )
  cm.UnregisterAllCallbacks(scope)
  MANAGER_STATE.extraMigrateParams[self.id] = undefined
}
