import "../async-declarations/async-declarations.module.code.ts"

import type {
  AsyncLib,
  AsyncSavedVarsTable,
  ConditionFunc,
  FuncOfTask,
  PairsIter,
  TaskInstance,
} from "../async-types/async-types.module.code.ts"

export function asAsyncLib(value: unknown): AsyncLib {
  return value as AsyncLib
}

export function asTaskInstance(value: unknown): TaskInstance {
  return value as TaskInstance
}

export interface GlobalTable {
  LibAsync?: unknown
  AsyncSavedVars?: AsyncSavedVarsTable
  [key: string]: unknown
}

export function asGlobalTable(value: unknown): GlobalTable {
  return value as GlobalTable
}

export type ForMarkerFunc = (this: void) => LuaMultiReturn<[boolean, unknown, unknown, unknown]>

export function asForMarkerFunc(value: unknown): ForMarkerFunc {
  return value as ForMarkerFunc
}

export function asFuncOfTask(value: unknown): FuncOfTask {
  return value as FuncOfTask
}

export function asNumber(value: unknown): number {
  return value as number
}

export function asString(value: unknown): string {
  return value as string
}

export function asConditionFunc(value: unknown): ConditionFunc {
  return value as ConditionFunc
}

export function asPairsIter(value: unknown): PairsIter {
  return value as PairsIter
}
