import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

type GlobalTable = Record<string, unknown>

type MaybeControl = Control | undefined

export function asGlobalTable(value: unknown): GlobalTable {
  return value as GlobalTable
}

export function asMaybeControl(value: unknown): MaybeControl {
  return value as MaybeControl
}
