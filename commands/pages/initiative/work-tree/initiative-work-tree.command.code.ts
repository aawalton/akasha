import { resolve } from "node:path"
import {
  type Drawn,
  drawnNow,
} from "akasha/agents/seats/modules/work-tree-drawn/work-tree-drawn.module.code.ts"
import { takenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import { colors } from "akasha/commands/arguments/pages/colors.argument.ts"
import { counts } from "akasha/commands/arguments/pages/counts.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import {
  DATA,
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { initiativeWorkTree as page } from "akasha/commands/pages/initiative/work-tree/initiative-work-tree.command.ts"
import {
  type InitiativeRow,
  initiativesDrawn,
} from "akasha/domains/modules/work-initiatives/work-initiatives.module.code.ts"

const NOTHING_DRAWN: Drawn = { byInitiative: new Map() }

const INTENT_MARK = "#"

export type NodeKind = "initiative" | "intent"

export interface Node {
  readonly kind: NodeKind
  readonly key: string
  readonly label: string
  readonly relPath: string | null
  readonly detail: string | null
  readonly note: string | null
  readonly color: string | null
  readonly children: readonly Node[]
}

export type Shown = "tree" | "json" | "counts" | "colors"

export type Asked = {
  readonly json: boolean
  readonly counts: boolean
  readonly colors: boolean
}

export function shownIn(asked: Asked): Shown {
  if (asked.json) return "json"
  if (asked.counts) return "counts"
  if (asked.colors) return "colors"
  return "tree"
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

export function walk(nodes: readonly Node[]): readonly Node[] {
  return nodes.flatMap((one) => [one, ...walk(one.children)])
}

export function countOf(nodes: readonly Node[], kind: NodeKind): number {
  return walk(nodes).filter((one) => one.kind === kind).length
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
  if (shown === "colors") return told([colorsSaid(root, drawnNow())])
  const tree = treeIn(root)
  if (shown === "json") return told([JSON.stringify({ repo: root, roots: tree })])
  if (shown === "counts") {
    return told([
      `initiatives:  ${String(countOf(tree, "initiative"))}`,
      `intents:      ${String(countOf(tree, "intent"))}`,
    ])
  }
  if (tree.length === 0) {
    return refusedBy([`no initiative was read from the index at ${root}`], DATA)
  }
  return told([...render(tree)])
}

export function initiativeWorkTree(argv: readonly string[], given: Given): Answer {
  const read = takenFor(argv, given.calledAs, page, [json, counts, colors])
  if ("refused" in read) return mistaking(read.refused)
  try {
    return said(resolve(given.root), shownIn(read.taken))
  } catch (thrown) {
    return refusedBy([whyOf(thrown)], OPERATIONAL)
  }
}
