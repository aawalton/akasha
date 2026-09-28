import { temperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.ts"

export interface CategoryPageRow {
  readonly slug: string
  readonly title?: string
  readonly displayOrder: number
  readonly parent?: string
}

interface PlacedSubfilter {
  readonly slug: string
  readonly label: string
}

interface PlacedCategory {
  readonly slug: string
  readonly label: string
  readonly subfilters: readonly PlacedSubfilter[]
}

const PARENT_PREFIX = `${temperBrowserCategory.slug}/`

function byOrder(this: void, one: CategoryPageRow, other: CategoryPageRow): number {
  return one.displayOrder - other.displayOrder
}

function parentSlugOf(parent: string): string {
  return parent.startsWith(PARENT_PREFIX) ? parent.slice(PARENT_PREFIX.length) : parent
}

export function placedCategories(rows: readonly CategoryPageRow[]): readonly PlacedCategory[] {
  const tops: CategoryPageRow[] = []
  const below: Record<string, CategoryPageRow[]> = {}
  for (const row of rows) {
    if (row.parent === undefined) {
      tops.push(row)
      continue
    }
    const parentSlug = parentSlugOf(row.parent)
    const held = below[parentSlug] ?? []
    held.push(row)
    below[parentSlug] = held
  }
  tops.sort(byOrder)
  const placed: PlacedCategory[] = []
  for (const top of tops) {
    const children = below[top.slug] ?? []
    children.sort(byOrder)
    const subfilters: PlacedSubfilter[] = []
    for (const child of children) {
      subfilters.push({ slug: child.slug, label: child.title ?? child.slug })
    }
    placed.push({ slug: top.slug, label: top.title ?? top.slug, subfilters })
  }
  return placed
}
