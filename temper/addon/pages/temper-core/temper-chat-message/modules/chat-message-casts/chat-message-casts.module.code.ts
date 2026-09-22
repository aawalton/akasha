import type {
  HistoryEntry,
  Settings,
} from "akasha/temper/addon/pages/temper-core/temper-chat-message/modules/chat-message-types/chat-message-types.module.code.ts"
import "akasha/temper/eso/type/eso-map-ui/eso-map-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"

export type GlobalTable = Record<string, unknown>

export function asZoColorDef(value: string | ZoColorDef): ZoColorDef {
  return value as ZoColorDef
}

export type ChatEventKey = string | number
export function asChatEventKey(value: unknown): ChatEventKey {
  return value as ChatEventKey
}

export type StringChunks = string[]
export function asStringChunks(value: unknown): StringChunks {
  return value as StringChunks
}

export type StringRecord = Record<string, unknown>

export function asSettings(value: unknown): Settings {
  return value as Settings
}

export type HistoryArray = HistoryEntry[]
export function asHistoryArray(value: unknown): HistoryArray {
  return value as HistoryArray
}
