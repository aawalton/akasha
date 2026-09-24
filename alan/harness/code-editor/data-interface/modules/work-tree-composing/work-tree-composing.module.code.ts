import {
  type Drawn,
  drawnNow,
} from "akasha/agent/seat/fleet/modules/work-tree-drawn/work-tree-drawn.module.code.ts"
import {
  type InitiativeRow,
  initiativesDrawn,
} from "akasha/domain/modules/work-initiatives/work-initiatives.module.code.ts"

const NOTHING_DRAWN: Drawn = { byInitiative: new Map() }

const INTENT_MARK = "#"

export interface Node {
  readonly kind: "initiative" | "intent"
  readonly key: string
  readonly label: string
  readonly relPath: string | null
  readonly detail: string | null
  readonly note: string | null
  readonly color: string | null
  readonly children: readonly Node[]
}

function byKey(a: Node, b: Node): number {
  return a.key.localeCompare(b.key, "en", { numeric: true })
}

function sorted(nodes: readonly Node[]): readonly Node[] {
  return [...nodes].sort(byKey)
}

function rootedness<T extends { readonly parent: string | null }>(
  rows: ReadonlyMap<string, T>
): ReadonlyMap<string, string | null> {
  const settled = new Map<string, string | null>()
  for (const [key, row] of rows) {
    const declared = row.parent
    if (declared === null || !rows.has(declared)) {
      settled.set(key, null)
      continue
    }
    const open = new Set<string>([key])
    let at: string | null = declared
    let cyclic = false
    while (at !== null) {
      const above = rows.get(at)
      if (above === undefined) break
      if (open.has(at)) {
        cyclic = true
        break
      }
      open.add(at)
      at = above.parent
    }
    settled.set(key, cyclic ? null : declared)
  }
  return settled
}

function rootNote(
  declared: string | null,
  effective: string | null,
  rows: ReadonlyMap<string, unknown>
): string | null {
  if (declared === null || effective !== null) return null
  return rows.has(declared)
    ? `drawn as a root: its parent chain through ${declared} closes on itself`
    : `drawn as a root: it names parent ${declared}, which has no document`
}

function intentNodes(row: InitiativeRow): readonly Node[] {
  return row.intents.map((one, at) => ({
    kind: "intent" as const,
    key: `${row.slug}${INTENT_MARK}${String(at + 1)}`,
    label: one.statement,
    relPath: row.path,
    detail: null,
    note: one.workingMemory,
    color: null,
    children: [],
  }))
}

function nodeOf(
  row: InitiativeRow,
  parents: ReadonlyMap<string, string | null>,
  children: ReadonlyMap<string, readonly string[]>,
  rows: ReadonlyMap<string, InitiativeRow>,
  drawn: Drawn
): Node {
  return {
    kind: "initiative",
    key: row.slug,
    label: row.slug,
    relPath: row.path,
    detail: row.persona,
    note: rootNote(row.parent, parents.get(row.slug) ?? null, rows),
    color: drawn.byInitiative.get(row.slug) ?? null,
    children: [
      ...intentNodes(row),
      ...sorted(
        (children.get(row.slug) ?? []).flatMap((slug) => {
          const below = rows.get(slug)
          return below === undefined ? [] : [nodeOf(below, parents, children, rows, drawn)]
        })
      ),
    ],
  }
}

export function treeOf(
  initiatives: readonly InitiativeRow[],
  drawn: Drawn = NOTHING_DRAWN
): readonly Node[] {
  const bySlug = new Map(initiatives.map((one) => [one.slug, one]))
  const parents = rootedness(bySlug)
  const children = new Map<string, string[]>()
  for (const [slug, parent] of parents) {
    if (parent === null) continue
    const under = children.get(parent)
    if (under === undefined) children.set(parent, [slug])
    else under.push(slug)
  }
  return sorted(
    initiatives
      .filter((one) => parents.get(one.slug) === null)
      .map((one) => nodeOf(one, parents, children, bySlug, drawn))
  )
}

export function treeIn(root: string): readonly Node[] {
  return treeOf(initiativesDrawn(root), drawnNow())
}
