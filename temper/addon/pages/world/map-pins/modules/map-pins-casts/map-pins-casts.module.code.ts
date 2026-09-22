import type {
  GamepadFilterInfo,
  HookedPin,
  MapPinClassShape,
} from "akasha/temper/addon/pages/world/map-pins/modules/map-pins-types/map-pins-types.module.code.ts"
import "akasha/temper/addon/pages/world/map-pins/map-pins-declarations/map-pins-declarations.type-declaration.d.ts"

export type GlobalTable = Record<string, unknown>

export type PinTypeId = number | undefined
export type MapPinClass = MapPinClassShape
export type HookPin = HookedPin
export type ColorTuple = [number, number, number, number]
export type FilterPanel = ResolvedFilterPanel
export type GrayscaleFn = (this: void, pin: unknown) => unknown
export type FilterTooltipFn = (this: void) => string
export type OptionalObject = object | undefined

export function asPinTypeId(value: unknown): PinTypeId {
  return value as PinTypeId
}

export function asMapPinClass(value: unknown): MapPinClass {
  return value as MapPinClass
}

export function asHookPin(value: unknown): HookPin {
  return value as HookPin
}

export function asColorTuple(value: unknown): ColorTuple {
  return value as ColorTuple
}

export function asFilterPanel(value: unknown): FilterPanel {
  return value as FilterPanel
}

export function asGamepadFilterInfo(value: unknown): GamepadFilterInfo {
  return value as GamepadFilterInfo
}

export function asGrayscaleFn(value: unknown): GrayscaleFn {
  return value as GrayscaleFn
}

export function asFilterTooltipFn(value: unknown): FilterTooltipFn {
  return value as FilterTooltipFn
}

export function asOptionalObject(value: unknown): OptionalObject {
  return value as OptionalObject
}
