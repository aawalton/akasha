import type {
  InternalTable,
  JournalListClass,
  PublicTable,
  TabData,
} from "akasha/temper/addon/pages/world/collections/modules/journal-shape/journal-shape.module.code.ts"
import "akasha/temper/addon/pages/lib-custom-menu/custom-menu-declarations/custom-menu-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-4/eso-interface-extra-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-journal-window/eso-journal-window.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

type GlobalTable = Record<string, unknown>
export function asGlobalTable(value: unknown): GlobalTable {
  return value as GlobalTable
}

export function asTooltipControl(value: unknown): TooltipControl {
  return value as TooltipControl
}

export function asOptionalString(value: unknown): string | undefined {
  return value as string | undefined
}

export function asBoolean(value: unknown): boolean {
  return value as boolean
}

export function asInternalTable(value: unknown): InternalTable {
  return value as InternalTable
}

export function asPublicTable(value: unknown): PublicTable {
  return value as PublicTable
}

export function asJournalListClass(value: unknown): JournalListClass {
  return value as JournalListClass
}

export function asTabData(value: unknown): TabData {
  return value as TabData
}

export function asString(value: unknown): string {
  return value as string
}

export function asNumber(value: unknown): number {
  return value as number
}

export function asRecord(value: unknown): Record<string, unknown> {
  return value as Record<string, unknown>
}

type Callback = (this: void, ...args: unknown[]) => void
export function asCallback(value: unknown): Callback {
  return value as Callback
}

export function asControl(value: unknown): Control {
  return value as Control
}

export function asLabelControl(value: unknown): LabelControl {
  return value as LabelControl
}

export function asZoComboBox(value: unknown): ZoComboBox {
  return value as ZoComboBox
}

export function parseHookArgs(this: void, args: never[]): unknown[] {
  return args
}
