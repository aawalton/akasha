import "akasha/alan/harness/code-editor/data-interface/pages/work-tree/work-tree.code-editor-data-interface.d.ts"
import "akasha/alan/harness/code-editor/data-interface/tree-row/tree-row.type-declaration.d.ts"

const INTENT_MARK = "#"

export type Holding =
  | {
      readonly kind: "intents"
      readonly labels: readonly string[]
      readonly without: readonly string[]
      readonly waiting: number
    }
  | { readonly kind: "nothing"; readonly waiting: number }
  | {
      readonly kind: "color"
      readonly color: string
      readonly seat: string
      readonly waiting: number
    }

type Agreement = "agrees" | "stale" | "gone"

function initiativeIn(roots: readonly WorkTreeRow[], slug: string): WorkTreeRow | null {
  for (const row of roots) {
    if (row.kind === "initiative" && row.key === slug) return row
    const below = initiativeIn(row.children, slug)
    if (below !== null) return below
  }
  return null
}

export function intentLabelsIn(
  roots: readonly WorkTreeRow[],
  slug: string
): readonly string[] | null {
  const row = initiativeIn(roots, slug)
  if (row === null) return null
  return row.children.filter((child) => child.kind === "intent").map((child) => child.label)
}

export function colorIn(roots: readonly WorkTreeRow[], slug: string): string | null {
  return initiativeIn(roots, slug)?.color ?? null
}

export function movedLabels(
  labels: readonly string[] | null,
  from: number,
  to: number
): readonly string[] | null {
  if (labels === null) return null
  if (from < 1 || to < 1 || from > labels.length || to > labels.length) return null
  const rest = [...labels]
  const [one] = rest.splice(from - 1, 1)
  if (one === undefined) return null
  rest.splice(to - 1, 0, one)
  return rest
}

function within(one: readonly string[], other: readonly string[]): boolean {
  const rest = [...other]
  for (const label of one) {
    const at = rest.indexOf(label)
    if (at === -1) return false
    rest.splice(at, 1)
  }
  return true
}

export function agreementOf(
  there: readonly string[] | null,
  held: Holding,
  color: string | null = null
): Agreement {
  if (held.kind === "nothing") return there === null ? "agrees" : "stale"
  if (there === null) return "gone"
  if (held.kind === "color") return color === held.color ? "agrees" : "stale"
  if (
    there.length === held.labels.length &&
    there.every((label, at) => label === held.labels[at])
  ) {
    return "agrees"
  }
  if (!within(held.labels, there)) return "gone"
  return within(there, [...held.labels, ...held.without]) ? "stale" : "gone"
}

function withoutOf(held: Holding | undefined): readonly string[] {
  return held === undefined || held.kind !== "intents" ? [] : held.without
}

function waitingOf(held: Holding | undefined): number {
  return held === undefined ? 0 : held.waiting
}

export function heldGone(held: Holding | undefined): Holding {
  return { kind: "nothing", waiting: waitingOf(held) + 1 }
}

export function heldColored(held: Holding | undefined, color: string, seat: string): Holding {
  return { kind: "color", color, seat, waiting: waitingOf(held) + 1 }
}

export function heldAnswered(held: Holding | undefined): Holding | null {
  if (held === undefined) return null
  const waiting = Math.max(0, held.waiting - 1)
  return held.kind === "nothing" ? { kind: "nothing", waiting } : { ...held, waiting }
}

export function heldMoved(
  held: Holding | undefined,
  labels: readonly string[] | null,
  statement: string,
  onto: string
): Holding | null {
  if (held?.kind === "nothing" || labels === null) return null
  const from = labels.indexOf(statement)
  const to = labels.indexOf(onto)
  if (from === -1 || to === -1 || from === to) return null
  const moved = movedLabels(labels, from + 1, to + 1)
  if (moved === null) return null
  return {
    kind: "intents",
    labels: moved,
    without: withoutOf(held),
    waiting: waitingOf(held) + 1,
  }
}

export function heldWithout(
  held: Holding | undefined,
  labels: readonly string[] | null,
  statement: string
): Holding | null {
  if (held?.kind === "nothing" || labels === null) return null
  const at = labels.indexOf(statement)
  if (at === -1) return null
  return {
    kind: "intents",
    labels: [...labels.slice(0, at), ...labels.slice(at + 1)],
    without: [...withoutOf(held), statement],
    waiting: waitingOf(held) + 1,
  }
}

function reordered(row: WorkTreeRow, labels: readonly string[]): WorkTreeRow {
  const taken = row.children.filter((child) => child.kind === "intent")
  const rest = row.children.filter((child) => child.kind !== "intent")
  const put: WorkTreeRow[] = []
  for (const label of labels) {
    const at = taken.findIndex((child) => child.label === label)
    if (at === -1) return row
    const [one] = taken.splice(at, 1)
    if (one !== undefined) put.push(one)
  }
  const keyed = put.map((child, at) => ({
    ...child,
    key: `${row.key}${INTENT_MARK}${String(at + 1)}`,
  }))
  return { ...row, children: [...keyed, ...rest] }
}

function reorderedTo(
  roots: readonly WorkTreeRow[],
  slug: string,
  labels: readonly string[]
): readonly WorkTreeRow[] {
  return roots.map((row) => {
    if (row.kind === "initiative" && row.key === slug) return reordered(row, labels)
    return { ...row, children: reorderedTo(row.children, slug, labels) }
  })
}

function withoutInitiative(roots: readonly WorkTreeRow[], slug: string): readonly WorkTreeRow[] {
  return roots
    .filter((row) => !(row.kind === "initiative" && row.key === slug))
    .map((row) => ({ ...row, children: withoutInitiative(row.children, slug) }))
}

function coloredTo(
  roots: readonly WorkTreeRow[],
  slug: string,
  color: string
): readonly WorkTreeRow[] {
  return roots.map((row) => {
    if (row.kind === "initiative" && row.key === slug) return { ...row, color }
    return { ...row, children: coloredTo(row.children, slug, color) }
  })
}

export function drawnAs(
  roots: readonly WorkTreeRow[],
  slug: string,
  held: Holding
): readonly WorkTreeRow[] {
  if (held.kind === "nothing") return withoutInitiative(roots, slug)
  if (held.kind === "color") return coloredTo(roots, slug, held.color)
  return reorderedTo(roots, slug, held.labels)
}

export function settledOver(
  roots: readonly WorkTreeRow[],
  holding: Map<string, Holding>
): readonly WorkTreeRow[] {
  let rows = roots
  for (const [slug, held] of [...holding]) {
    const agreement = agreementOf(intentLabelsIn(rows, slug), held, colorIn(rows, slug))
    if (held.waiting > 0 && agreement === "stale") {
      rows = drawnAs(rows, slug, held)
      continue
    }
    holding.delete(slug)
  }
  return rows
}
