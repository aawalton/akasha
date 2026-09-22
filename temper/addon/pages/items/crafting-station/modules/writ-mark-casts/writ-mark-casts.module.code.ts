import "akasha/temper/addon/pages/items/crafting-station/potion-decl-controls/potion-decl-controls.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

export type GlobalTable = Record<string, unknown>

export type MaybeControl = Control | undefined

export function asGlobalTable(value: unknown): GlobalTable {
  return value as GlobalTable
}

export function asMaybeControl(value: unknown): MaybeControl {
  return value as MaybeControl
}
