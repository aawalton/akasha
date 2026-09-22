import type {
  CallbackObject,
  LibHistoireGlobal,
  LibHistoireInternal,
  Logger,
} from "akasha/temper/addon/pages/capture-sales/modules/histoire-types/histoire-types.module.code.ts"
import "akasha/temper/addon/type/lib-async/lib-async.type-declaration.d.ts"

export function asHistoryInternal(value: unknown): LibHistoireInternal {
  return value as LibHistoireInternal
}

export function asHistoryHandle(value: unknown): LibHistoireGlobal {
  return value as LibHistoireGlobal
}

export function asCallbackObject(value: unknown): CallbackObject {
  return value as CallbackObject
}

export function asLogger(value: unknown): Logger {
  return value as Logger
}

export interface GlobalTable {
  LibAsync?: LibAsyncLib
  LibHistoire_Settings?: Record<string, unknown>
  LibHistoire_GuildHistoryCache?: Record<string, unknown>
  [key: string]: unknown
}

export function asGlobalTable(value: unknown): GlobalTable {
  return value as GlobalTable
}
