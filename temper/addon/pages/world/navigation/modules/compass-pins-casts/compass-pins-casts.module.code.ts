import type {
  CompassLayoutResetFn,
  CompassLayoutUpdateFn,
  CompassPinData,
  CompassPoolClass,
} from "akasha/temper/addon/pages/world/navigation/modules/compass-pins-types/compass-pins-types.module.code.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/crafting-station/potion-decl-controls/potion-decl-controls.type-declaration.d.ts"
import "akasha/temper/addon/type/custom-compass-pins/custom-compass-pins.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

export type GlobalTable = Record<string, unknown>

export type PinTypeId = number

export type TableKey = AnyNotNil

export type MaybeUpdateFn = CompassLayoutUpdateFn | undefined

export type MaybeResetFn = CompassLayoutResetFn | undefined

export type OptString = string | undefined

export function asGlobalTable(value: unknown): GlobalTable {
  return value as GlobalTable
}

export function asPinTypeId(value: unknown): PinTypeId {
  return value as PinTypeId
}

export function asTableKey(value: unknown): TableKey {
  return value as TableKey
}

export function asCompassPinData(value: unknown): CompassPinData {
  return value as CompassPinData
}

export function asMaybeUpdateFn(value: unknown): MaybeUpdateFn {
  return value as MaybeUpdateFn
}

export function asMaybeResetFn(value: unknown): MaybeResetFn {
  return value as MaybeResetFn
}

export function asOptString(value: unknown): OptString {
  return value as OptString
}

export function asCustomCompassPins(value: unknown): CustomCompassPins {
  return value as CustomCompassPins
}

export function asCompassPoolClass(value: unknown): CompassPoolClass {
  return value as CompassPoolClass
}

export function asControl(value: unknown): Control {
  return value as Control
}
