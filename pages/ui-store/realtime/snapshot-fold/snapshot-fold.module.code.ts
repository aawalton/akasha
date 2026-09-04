import type { PageRow } from "../payload-translator/payload-translator.module.code.ts"

export type SnapshotEntry =
  | { readonly kind: "upsert"; readonly row: PageRow }
  | { readonly kind: "delete"; readonly id: string }

export function foldSnapshotEntries(entries: readonly SnapshotEntry[]): {
  readonly upserts: readonly PageRow[]
  readonly deletes: readonly string[]
} {
  const finalById = new Map<string, SnapshotEntry>()
  for (const entry of entries) {
    const id = entry.kind === "upsert" ? entry.row.id : entry.id
    finalById.set(id, entry)
  }
  const upserts: PageRow[] = []
  const deletes: string[] = []
  for (const entry of finalById.values()) {
    if (entry.kind === "upsert") upserts.push(entry.row)
    else deletes.push(entry.id)
  }
  return { upserts, deletes }
}
