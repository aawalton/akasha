import type { PropertyDefinition } from "@akasha/pages-core/types"
import {
  type PageTableColumn,
  TITLE_COLUMN_ID,
} from "@akasha/pages-ui-components/page-table-shared"

export const RESERVED_PROPERTY_IDS = ["title", "icon", "cover", "content", "id", "userId"] as const

const RESERVED_PROPERTY_IDS_SET: ReadonlySet<string> = new Set(RESERVED_PROPERTY_IDS)

export function isCardEligibleProperty(def: PropertyDefinition): boolean {
  if (RESERVED_PROPERTY_IDS_SET.has(def.id)) return false
  return true
}

export function selectVisibleCardProperties(
  defs: readonly PropertyDefinition[],
  visibleIds: readonly string[]
): readonly PropertyDefinition[] {
  if (visibleIds.length === 0) return []
  const defById = new Map(defs.map((d) => [d.id, d]))
  const seen = new Set<string>()
  const out: PropertyDefinition[] = []
  for (const id of visibleIds) {
    if (seen.has(id)) continue
    seen.add(id)
    const def = defById.get(id)
    if (def && isCardEligibleProperty(def)) out.push(def)
  }
  return out
}

export type OrderedTableColumn =
  | { id: string; isTitle: true }
  | { id: string; isTitle: false; def: PropertyDefinition }

export function orderTableColumns(
  defs: readonly PropertyDefinition[],
  visibleProperties: readonly string[]
): readonly OrderedTableColumn[] {
  const defById = new Map(defs.map((d) => [d.id, d]))
  const seen = new Set<string>()
  const out: OrderedTableColumn[] = []
  let titlePlaced = false
  for (const id of visibleProperties) {
    if (seen.has(id)) continue
    seen.add(id)
    if (id === TITLE_COLUMN_ID) {
      out.push({ id, isTitle: true })
      titlePlaced = true
      continue
    }
    const def = defById.get(id)
    if (def && isCardEligibleProperty(def)) out.push({ id, isTitle: false, def })
  }
  if (!titlePlaced) out.unshift({ id: TITLE_COLUMN_ID, isTitle: true })
  return out
}

export function buildTableColumns(
  defs: readonly PropertyDefinition[],
  visibleProperties: readonly string[]
): readonly PageTableColumn[] {
  return orderTableColumns(defs, visibleProperties).map((col) =>
    col.isTitle ? { id: col.id, label: "Name" } : { id: col.id, label: col.def.title, def: col.def }
  )
}
