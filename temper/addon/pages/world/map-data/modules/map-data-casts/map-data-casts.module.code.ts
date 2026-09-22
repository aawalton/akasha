import type {
  Internal,
  Lib,
} from "akasha/temper/addon/pages/world/map-data/modules/map-data-types/map-data-types.module.code.ts"

export function asLib(value: unknown): Lib {
  return value as Lib
}

export function asInternal(value: unknown): Internal {
  return value as Internal
}
