import type {
  CallbackObject,
  LibHistoireGlobal,
  LibHistoireInternal,
  Logger,
} from "../histoire-types/histoire-types.module.code.ts"

export function asLibHistoireInternal(value: unknown): LibHistoireInternal {
  return value as LibHistoireInternal
}

export function asLibHistoireGlobal(value: unknown): LibHistoireGlobal {
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
  LibHistoire?: unknown
  LibHistoire_Settings?: Record<string, unknown>
  LibHistoire_GuildNames?: Record<string, unknown>
  LibHistoire_NameDictionary?: Record<string, unknown>
  LibHistoire_GuildHistory?: Record<string, unknown>
  LibHistoire_GuildHistoryCache?: Record<string, unknown>
  [key: string]: unknown
}

export function asGlobalTable(value: unknown): GlobalTable {
  return value as GlobalTable
}
