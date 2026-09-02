import type {
  GlobalObjectTable,
  Internal,
  Lib,
  MetatableView,
  UserdataView,
} from "../map-data-types/map-data-types.module.code.ts"

export function asLib(value: unknown): Lib {
  return value as Lib
}

export function asInternal(value: unknown): Internal {
  return value as Internal
}

export function asGlobalObjectTable(value: unknown): GlobalObjectTable {
  return value as GlobalObjectTable
}

export function asMetatableView(value: unknown): MetatableView {
  return value as MetatableView
}

export function asUserdataView(value: unknown): UserdataView {
  return value as UserdataView
}
