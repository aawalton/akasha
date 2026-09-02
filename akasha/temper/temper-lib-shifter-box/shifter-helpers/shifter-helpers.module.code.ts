import { asString } from "../shifter-casts/shifter-casts.module.code.ts"
import { LIB_IDENTIFIER } from "../shifter-constants/shifter-constants.module.code.ts"
import { CM, lib } from "../shifter-state/shifter-state.module.code.ts"
import type {
  MasterEntry,
  ShifterBox,
  ShifterBoxList,
  Valued,
} from "../shifter-types/shifter-types.module.code.ts"

export function getDeepClonedTable<T>(sourceTable: T | undefined): T | undefined {
  if (sourceTable === undefined) return undefined
  return ZO_DeepTableCopy(sourceTable)
}

export function getShallowClonedTable<T>(sourceTable: T | undefined): T | undefined {
  if (sourceTable === undefined) return undefined
  return ZO_ShallowTableCopy(sourceTable)
}

function isCallback<T>(value: Valued<T>): value is (this: void, ...args: unknown[]) => T {
  return type(value) === "function"
}

export function getValueOrCallback<T>(arg: Valued<T>, ...args: unknown[]): T {
  if (isCallback(arg)) {
    return arg(...args)
  }
  return arg
}

export function getUniqueShifterBoxEventName(shifterBox: ShifterBox, eventId: number): string {
  const parts: (string | number)[] = [
    LIB_IDENTIFIER,
    "_",
    asString(shifterBox.addonName),
    "_",
    asString(shifterBox.shifterBoxName),
    "_",
    eventId,
  ]
  return table.concat(parts)
}

export function fireCallback(
  shifterBox: ShifterBox,
  controlForCallback: object | undefined,
  eventId: number,
  ...rest: unknown[]
): undefined {
  const callbackIdentifier = getUniqueShifterBoxEventName(shifterBox, eventId)
  const target = controlForCallback ?? shifterBox
  CM.FireCallbacks(callbackIdentifier, target, ...rest)
}

export function refreshFilter(list: ShifterBoxList, checkForClearTrigger: boolean): undefined {
  list.RefreshFilters()
  const [firstDataKey] = next(list.list.data)
  if (checkForClearTrigger && firstDataKey === undefined) {
    fireCallback(
      list.shifterBox,
      undefined,
      list.isLeftList ? lib.EVENT_LEFT_LIST_CLEARED : lib.EVENT_RIGHT_LIST_CLEARED
    )
  }
}

export function refreshFilters(
  list: ShifterBoxList | undefined,
  anotherList: ShifterBoxList | undefined,
  checkForClearTrigger: boolean
): undefined {
  if (list !== undefined) refreshFilter(list, checkForClearTrigger)
  if (anotherList !== undefined) refreshFilter(anotherList, checkForClearTrigger)
}

export function defaultSearchFunc(
  this: void,
  _list: ShifterBoxList,
  entry: MasterEntry,
  searchStr: string
): boolean {
  const name = entry.value ?? entry.key
  const [matchStart] = string.find(zo_strlower(asString(name)), searchStr)
  return matchStart !== undefined
}
