import type { Lib } from "../alchemy-station-types/alchemy-station-types.module.code.ts"

export function asLib(value: unknown): Lib {
  return value as Lib
}
