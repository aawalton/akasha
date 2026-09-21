import "akasha/temper/addon/pages/lib-addon-menu-order-list-box/order-list-box-shape/order-list-box-shape.type-declaration.d.ts"
import "akasha/temper/addon/pages/lib-custom-menu/custom-menu-declarations/custom-menu-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-4/eso-interface-extra-4.type-declaration.d.ts"

export type Thunk<T> = (this: void) => T

export function asThunk<T>(value: unknown): Thunk<T> {
  return value as Thunk<T>
}

export type EsoHandler = (this: void, ...args: unknown[]) => undefined

export function asEsoHandler(value: unknown): EsoHandler {
  return value as EsoHandler
}

export function asControl(value: unknown): Control {
  return value as Control
}

export function asLabelControl(value: unknown): LabelControl {
  return value as LabelControl
}

export function asLamControl(value: unknown): LamControl {
  return value as LamControl
}

export function asOrderListBox(value: unknown): OrderListBox {
  return value as OrderListBox
}

export function asOrderScrollList(value: unknown): OrderScrollList {
  return value as OrderScrollList
}

export function asOrderRowControl(value: unknown): OrderRowControl {
  return value as OrderRowControl
}

export function asOrderButtonControl(value: unknown): OrderButtonControl {
  return value as OrderButtonControl
}

export function asCursorTLC(value: unknown): LamCursorTLC {
  return value as LamCursorTLC
}

export function asListEntry(value: unknown): ListEntry {
  return value as ListEntry
}

export function asNumber(value: unknown): number {
  return value as number
}

export type DisplayText = string | number

export function asDisplayText(value: unknown): DisplayText {
  return value as DisplayText
}
