import type {
  CompatLib,
  CoordFn,
  EsoVoidFn,
  GlobalFnTable,
  GlobalObjectTable,
  Lib,
  LmpPinManager,
  SuccessFn,
} from "../map-ping-types/map-ping-types.module.code.ts"

export function asGlobalFnTable(value: unknown): GlobalFnTable {
  return value as GlobalFnTable
}

export function asEsoVoidFn(value: unknown): EsoVoidFn {
  return value as EsoVoidFn
}

export function asGlobalObjectTable(value: unknown): GlobalObjectTable {
  return value as GlobalObjectTable
}

export function asCoordFn(value: unknown): CoordFn {
  return value as CoordFn
}

export function asSuccessFn(value: unknown): SuccessFn {
  return value as SuccessFn
}

export function asLmpPinManager(value: unknown): LmpPinManager {
  return value as LmpPinManager
}

export function asLib(value: unknown): Lib {
  return value as Lib
}

export function asCompatLib(value: unknown): CompatLib {
  return value as CompatLib
}
