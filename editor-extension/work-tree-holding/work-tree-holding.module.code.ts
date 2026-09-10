const INTENT_MARK = "#"

export type Holding =
  | {
      readonly kind: "intents"
      readonly labels: readonly string[]
      readonly without: readonly string[]
    }
  | { readonly kind: "nothing" }

export const HOLDING_NOTHING: Holding = { kind: "nothing" }

export type Agreement = "agrees" | "stale" | "gone"

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

function sameLabels(one: readonly string[], other: readonly string[]): boolean {
  if (one.length !== other.length) return false
  const sorted = [...one].sort()
  const beside = [...other].sort()
  return sorted.every((label, at) => label === beside[at])
}

export function agreementOf(there: readonly string[] | null, held: Holding): Agreement {
  if (held.kind === "nothing") return there === null ? "agrees" : "stale"
  if (there === null) return "gone"
  if (sameLabels(there, held.labels)) {
    return there.every((label, at) => label === held.labels[at]) ? "agrees" : "stale"
  }
  return sameLabels(there, [...held.labels, ...held.without]) ? "stale" : "gone"
}

function withoutOf(held: Holding | undefined): readonly string[] {
  return held === undefined || held.kind !== "intents" ? [] : held.without
}

export function heldMoved(
  held: Holding | undefined,
  labels: readonly string[] | null,
  from: number,
  to: number
): Holding | null {
  if (held?.kind === "nothing") return null
  const moved = movedLabels(labels, from, to)
  if (moved === null) return null
  return { kind: "intents", labels: moved, without: withoutOf(held) }
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

export function drawnAs(
  roots: readonly WorkTreeRow[],
  slug: string,
  held: Holding
): readonly WorkTreeRow[] {
  if (held.kind === "nothing") return withoutInitiative(roots, slug)
  return reorderedTo(roots, slug, held.labels)
}
