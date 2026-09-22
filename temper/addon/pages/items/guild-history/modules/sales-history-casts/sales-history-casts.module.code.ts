import type {
  CallbackObject,
  HistoryHandle,
  HistoryInternal,
  Logger,
} from "akasha/temper/addon/pages/items/guild-history/modules/sales-history-types/sales-history-types.module.code.ts"
import "akasha/temper/addon/type/temper-async-global/temper-async-global.type-declaration.d.ts"

export function asHistoryInternal(value: unknown): HistoryInternal {
  return value as HistoryInternal
}

export function asHistoryHandle(value: unknown): HistoryHandle {
  return value as HistoryHandle
}

export function asCallbackObject(value: unknown): CallbackObject {
  return value as CallbackObject
}

export function asLogger(value: unknown): Logger {
  return value as Logger
}

export interface GlobalTable {
  TemperAsync?: TemperAsyncLib
  TemperItemsGuildHistorySettings?: Record<string, unknown>
  TemperItemsGuildHistoryCache?: Record<string, unknown>
  [key: string]: unknown
}

export function asGlobalTable(value: unknown): GlobalTable {
  return value as GlobalTable
}
