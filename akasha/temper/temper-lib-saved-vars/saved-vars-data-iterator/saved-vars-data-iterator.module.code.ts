import {
  asDataInstance,
  asDataSource,
  asIndexable,
  asLsvTable,
  asManagerInstance,
  asTable,
  asUnknownArray,
} from "../saved-vars-casts/saved-vars-casts.module.code.ts"
import {
  getAccountSavedVarsActive,
  getActiveSavedVars,
} from "../saved-vars-data-active/saved-vars-data-active.module.code.ts"
import { tableFilterKeys } from "../saved-vars-data-helpers/saved-vars-data-helpers.module.code.ts"
import { DATA_STATE, rawnext } from "../saved-vars-data-state/saved-vars-data-state.module.code.ts"
import { LSV } from "../saved-vars-registry/saved-vars-registry.module.code.ts"
import type {
  DataInstance,
  LsvTable,
  NextFn,
} from "../saved-vars-types/saved-vars-types.module.code.ts"

export function getIterator(
  this: void,
  self: DataInstance | undefined
): LuaMultiReturn<[NextFn, DataInstance | undefined]> {
  LSV.protected.Debug("LSV_Data:GetIterator()", DATA_STATE.debugMode)
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

  const subTables: LsvTable[] = []
  let pinnedKeys: LsvTable | undefined = ds.pinnedAccountKeys
  let pinnedIsEmpty = false
  if (pinnedKeys !== undefined) {
    const [firstPinned] = rawnext(pinnedKeys)
    pinnedIsEmpty = firstPinned === undefined
  }
  if ((pinnedKeys !== undefined && pinnedIsEmpty) || getAccountSavedVarsActive(self) === true) {
    pinnedKeys = undefined
  }
  if (pinnedKeys !== undefined) {
    let accountRawDataTable: LsvTable | undefined
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
  let rawDataTable: LsvTable | undefined
  if (savedVars !== undefined) {
    rawDataTable = LSV.lib.GetRawDataTable(savedVars)
  }
  if (rawDataTable !== undefined) {
    subTables.push(rawDataTable)
  }

  subTables.push(asLsvTable({ __dataSource: ds }))
  LSV.protected.Debug(
    "subTables: <<1>>, #subTables: <<2>>",
    DATA_STATE.debugMode,
    tostring(subTables),
    subTables.length
  )

  let subTableIndex = 1
  let subTable: LsvTable | undefined = subTables[0]
  const iterator: NextFn = (_t, key) => {
    let k = key
    if (k === undefined) {
      subTableIndex = 1
      subTable = subTables[0]
    }
    let value: unknown
    do {
      LSV.protected.Debug(
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
    LSV.protected.Debug("key: <<1>>, value: <<2>>", DATA_STATE.debugMode, k, value)
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
  LSV.protected.Debug("LSV_Data:GetLength()", DATA_STATE.debugMode)

  const accountActive = getAccountSavedVarsActive(asDataInstance(LSV.data))
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
  const rawChar = asIndexable(asLsvTable(rawCharacter))
  let i = 1
  while (pinned[i] !== undefined || rawChar[i] !== undefined) {
    i = i + 1
  }
  return i - 1
}
