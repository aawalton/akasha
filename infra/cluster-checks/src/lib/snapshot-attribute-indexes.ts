export interface SnapshotAttributeIndex {
  readonly indexName: string
  readonly table: string
  readonly key: string
  readonly form: "->>" | "->"
}

const CREATE_INDEX_RE =
  /CREATE\s+(?:UNIQUE\s+)?INDEX\s+(?:CONCURRENTLY\s+)?(?:IF\s+NOT\s+EXISTS\s+)?("?[\w]+"?)\s+ON\s+(?:public\.)?("?[\w]+"?)[^;]*?;/gis

const ATTR_EXTRACT_RE = /attributes\s*(->>|->)\s*'([^']*)'/gi

function unquote(ident: string): string {
  return ident.startsWith('"') && ident.endsWith('"') ? ident.slice(1, -1) : ident
}

export function parseSnapshotAttributeIndexes(sqlText: string): readonly SnapshotAttributeIndex[] {
  const out: SnapshotAttributeIndex[] = []
  for (const stmt of sqlText.matchAll(CREATE_INDEX_RE)) {
    const indexName = unquote(stmt[1] ?? "")
    const table = unquote(stmt[2] ?? "")
    const body = stmt[0]
    const seen = new Set<string>()
    for (const ex of body.matchAll(ATTR_EXTRACT_RE)) {
      const form = ex[1] === "->>" ? "->>" : "->"
      const key = ex[2] ?? ""
      const dedupe = `${form}:${key}`
      if (seen.has(dedupe)) continue
      seen.add(dedupe)
      out.push({ indexName, table, key, form })
    }
  }
  return out
}

export function indexCoversKey(
  indexes: readonly SnapshotAttributeIndex[],
  args: { readonly indexName: string; readonly table: string; readonly key: string }
): boolean {
  return indexes.some(
    (i) => i.indexName === args.indexName && i.table === args.table && i.key === args.key
  )
}
