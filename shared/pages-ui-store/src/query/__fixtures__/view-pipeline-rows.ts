/**
 * Shared row-builder primitives for the view-pipeline unit tests. Extracted so
 * both the main durable-contract suite and the #14713 late-def-arrival suite
 * seed the same `PageRow` shape without duplicating the flattened-column
 * scaffolding. Fixtures live under `__fixtures__/` (file-length exempt) because
 * their size is a count of columns, not complexity.
 */
import { asPageRow, type PageRow } from "../../collection/page-row"

/** The root page-type id (parent of every page-type row). */
export const ROOT = "00000000-0000-7000-8000-000000000000"
/** Deterministic v7-shaped id from a small integer, hex-packed in the low bits. */
export function id(n: number): string {
  return `00000000-0000-7000-8000-${n.toString(16).padStart(12, "0")}`
}

export interface RowOverrides {
  readonly id: string
  readonly pageTypeId: string
  readonly slug: string
  readonly seq?: number
  readonly title?: string | null
  readonly attributes?: Readonly<Record<string, unknown>>
}

/** Build a fully-populated `PageRow` from a small set of overrides. */
export function row(o: RowOverrides): PageRow {
  return asPageRow({
    id: o.id,
    page_type_id: o.pageTypeId,
    user_id: "u1",
    seq: o.seq ?? 0,
    title: o.title ?? null,
    icon: null,
    attributes: o.attributes ?? {},
    page_type_slug: o.slug,
    unique_key: null,
    status: null,
    completed_at: null,
    slug: null,
    parent_key: null,
  })
}
