import {
  asDataInstance,
  asDataSource,
  asIndexable,
  asManagerInstance,
  asSavedVarsTable,
  asTable,
  asUnknownArray,
} from "akasha/temper/addon/pages/world/collections/modules/saved-vars-casts/saved-vars-casts.module.code.ts"
import {
  getAccountSavedVarsActive,
  getActiveSavedVars,
} from "akasha/temper/addon/pages/world/collections/modules/saved-vars-data-active/saved-vars-data-active.module.code.ts"
import { tableFilterKeys } from "akasha/temper/addon/pages/world/collections/modules/saved-vars-data-helpers/saved-vars-data-helpers.module.code.ts"
import {
  DATA_STATE,
  rawnext,
} from "akasha/temper/addon/pages/world/collections/modules/saved-vars-data-state/saved-vars-data-state.module.code.ts"
import { SAVED_VARS } from "akasha/temper/addon/pages/world/collections/modules/saved-vars-registry/saved-vars-registry.module.code.ts"
import type {
  DataInstance,
  NextFn,
  SavedVarsTable,
} from "akasha/temper/addon/pages/world/collections/modules/saved-vars-types/saved-vars-types.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"

export function getIterator(
  this: void,
  self: DataInstance | undefined
): LuaMultiReturn<[NextFn, DataInstance | undefined]> {
  SAVED_VARS.protected.Debug("SavedVarsData:GetIterator()", DATA_STATE.debugMode)
  if (self === undefined) {
    return $multi(rawnext, DATA_STATE.emptyObject)
  }
  const ds = asDataSource(rawget(self, "__dataSource"))
  if (ds === undefined) {
    return $multi(rawnext, DATA_STATE.emptyObject)
  }

  if (ds.iterator !== undefined) {
    return $multi(ds.iterator, self)
  }

  const subTables: SavedVarsTable[] = []
  let pinnedKeys: SavedVarsTable | undefined = ds.pinnedAccountKeys
  let pinnedIsEmpty = false
  if (pinnedKeys !== undefined) {
    const [firstPinned] = rawnext(pinnedKeys)
    pinnedIsEmpty = firstPinned === undefined
  }
  if ((pinnedKeys !== undefined && pinnedIsEmpty) || getAccountSavedVarsActive(self) === true) {
    pinnedKeys = undefined
  }
  if (pinnedKeys !== undefined) {
    let accountRawDataTable: SavedVarsTable | undefined
    if (ds.account !== undefined) {
      const [raw] = ds.account.LoadRawTableData()
      accountRawDataTable = raw
    }
    if (accountRawDataTable !== undefined) {
      const pinnedSettings = tableFilterKeys(accountRawDataTable, pinnedKeys)
      subTables.push(pinnedSettings)
    }
  }

  const savedVars = getActiveSavedVars(self)
  let rawDataTable: SavedVarsTable | undefined
  if (savedVars !== undefined) {
    rawDataTable = SAVED_VARS.lib.GetRawDataTable(savedVars)
  }
  if (rawDataTable !== undefined) {
    subTables.push(rawDataTable)
  }

  subTables.push(asSavedVarsTable({ __dataSource: ds }))
  SAVED_VARS.protected.Debug(
    "subTables: <<1>>, #subTables: <<2>>",
    DATA_STATE.debugMode,
    tostring(subTables),
    subTables.length
  )

  let subTableIndex = 1
  let subTable: SavedVarsTable | undefined = subTables[0]
  const iterator: NextFn = (_t, key) => {
    let k = key
    if (k === undefined) {
      subTableIndex = 1
      subTable = subTables[0]
    }
    let value: unknown
    do {
      SAVED_VARS.protected.Debug(
        "subtableIndex: <<1>>, subTable: <<2>>, key: <<3>>",
        DATA_STATE.debugMode,
        subTableIndex,
        tostring(subTable),
        k
      )
      const [nk, nv] = rawnext(asTable(subTable), k)
      k = nk
      value = nv
      if (k === undefined) {
        const nextSub = subTables[subTableIndex]
        subTableIndex = subTableIndex + 1
        subTable = nextSub
      }
    } while (k === undefined && subTable !== undefined)
    SAVED_VARS.protected.Debug("key: <<1>>, value: <<2>>", DATA_STATE.debugMode, k, value)
    if (subTable === undefined) {
      ds.iterator = undefined
    }
    return $multi(k, value)
  }

  return $multi(iterator, self)
}

export function getLength(this: void, self: DataInstance | undefined): number {
  if (self === undefined) {
    return 0
  }
  SAVED_VARS.protected.Debug("SavedVarsData:GetLength()", DATA_STATE.debugMode)

  const accountActive = getAccountSavedVarsActive(asDataInstance(SAVED_VARS.data))
  const selfFields = asIndexable(self)
  if (accountActive === true) {
    if (selfFields["account"] === undefined) {
      return 0
    }
    const [rawAccount] = asManagerInstance(selfFields["account"]).LoadRawTableData()
    return asUnknownArray(rawAccount).length
  }

  const [rawCharacter] = asManagerInstance(selfFields["character"]).LoadRawTableData()
  if (selfFields["pinnedAccountKeys"] === undefined) {
    return asUnknownArray(rawCharacter).length
  }

  const pinned = asIndexable(selfFields["pinnedAccountKeys"])
  const rawChar = asIndexable(asSavedVarsTable(rawCharacter))
  let i = 1
  while (pinned[i] !== undefined || rawChar[i] !== undefined) {
    i = i + 1
  }
  return i - 1
}
