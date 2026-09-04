import { resolve } from "node:path"
import type { Answer, Given } from "@akasha/command-system/calling"
import { whyOf } from "@akasha/command-system/fault-saying"
import { type InitiativeRow, initiativesDrawn } from "@akasha/editor-extension/work-initiatives"
import { type Drawn, drawnNow } from "@akasha/seat-system/work-tree-drawn"

export const JSON_OUT = "--json"

export const COUNTS = "--counts"

export const COLORS = "--colors"

const FLAGS = [JSON_OUT, COUNTS, COLORS]

const NOTHING_DRAWN: Drawn = { byInitiative: new Map() }

export interface Node {
  readonly kind: "initiative"
  readonly key: string
  readonly label: string
  readonly relPath: string | null
  readonly detail: string | null
  readonly note: string | null
  readonly color: string | null
  readonly children: readonly Node[]
}

export type Shown = "tree" | "json" | "counts" | "colors"

export type Read = { readonly shown: Shown } | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  const named: string[] = []
  for (const one of argv) {
    if (FLAGS.includes(one)) {
      if (!named.includes(one)) named.push(one)
      continue
    }
    refusals.push(`\`${one}\` is no word this takes — it takes \`${FLAGS.join("`, `")}\``)
  }
  if (named.length > 1) {
    refusals.push(`${named.join(", ")} each name what to print, and one call prints one thing`)
  }
  if (refusals.length > 0) return { refused: refusals }
  const one = named[0]
  if (one === JSON_OUT) return { shown: "json" }
  if (one === COUNTS) return { shown: "counts" }
  if (one === COLORS) return { shown: "colors" }
  return { shown: "tree" }
}

export function colorsSaid(repo: string, drawn: Drawn): string {
  return JSON.stringify({ repo, byInitiative: Object.fromEntries(drawn.byInitiative) })
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
    children: sorted(
      (children.get(row.slug) ?? []).flatMap((slug) => {
        const below = rows.get(slug)
        return below === undefined ? [] : [nodeOf(below, parents, children, rows, drawn)]
      })
    ),
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

export function walk(nodes: readonly Node[]): readonly Node[] {
  return nodes.flatMap((one) => [one, ...walk(one.children)])
}

export function render(nodes: readonly Node[], depth = 0): readonly string[] {
  return nodes.flatMap((one) => {
    const detail = one.detail === null ? "" : `  — ${one.detail}`
    const note = one.note === null ? "" : `  [${one.note}]`
    return [`${"  ".repeat(depth)}${one.label}${detail}${note}`, ...render(one.children, depth + 1)]
  })
}

export function treeIn(root: string): readonly Node[] {
  return treeOf(initiativesDrawn(root), drawnNow())
}

function said(root: string, shown: Shown): Answer {
  if (shown === "colors") {
    return { report: [colorsSaid(root, drawnNow())], refusals: [], code: 0 }
  }
  const tree = treeIn(root)
  if (shown === "json") {
    return { report: [JSON.stringify({ repo: root, roots: tree })], refusals: [], code: 0 }
  }
  if (shown === "counts") {
    return { report: [`initiatives:  ${String(walk(tree).length)}`], refusals: [], code: 0 }
  }
  if (tree.length === 0) {
    return { report: [], refusals: [`no initiative was read from the index at ${root}`], code: 2 }
  }
  return { report: [...render(tree)], refusals: [], code: 0 }
}

export function workTree(argv: readonly string[], given: Given): Answer {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: 1 }
  try {
    return said(resolve(given.root), read.shown)
  } catch (thrown) {
    return { report: [], refusals: [whyOf(thrown)], code: 3 }
  }
}
