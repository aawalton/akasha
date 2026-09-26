import {
  companionCatalog,
  type RotationBreakdownRowTemplate,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"
import { textIn } from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-reading/companion-skill-reading.module.code.ts"

export type RotationBreakdownRowId = string

export const BREAKDOWN_ROW_KEYS: readonly string[] = [
  "slug",
  "key",
  "title",
  "fullName",
  "description",
]

export function breakdownRowsFrom(
  rows: readonly Readonly<Record<string, unknown>>[]
): readonly RotationBreakdownRowTemplate[] {
  return rows.map((row) => {
    const at = String(row.slug ?? row.key ?? "a rotation breakdown row")
    return {
      id: textIn(row.key, "key", at),
      name: textIn(row.title, "title", at),
      fullName: textIn(row.fullName, "fullName", at),
      description: textIn(row.description, "description", at),
    }
  })
}

export function rotationBreakdownRowAt(id: RotationBreakdownRowId): RotationBreakdownRowTemplate {
  const row = companionCatalog().breakdownRows.find((one) => one.id === id)
  if (row === undefined) throw new Error(`no rotation breakdown row page answers to \`${id}\``)
  return row
}
