import type * as vscode from "vscode"
import { callHarness } from "../harness-call/harness-call.module.code.ts"
import { VIEW_ID } from "../work-tree-ids/work-tree-ids.module.code.ts"

export const DRAG_MIME = `application/vnd.code.tree.${VIEW_ID.toLowerCase()}`

const MOVE_MODULE = "initiative-move-intent"

const MOVE_EXPORT = "initiativeMoveIntent"

const MOVE_TIMEOUT_MS = 60_000

const INTENT_MARK = "#"

export type Keyed = {
  readonly slug: string
  readonly place: number
}

export type Ordering = {
  readonly slug: string
  readonly from: number
  readonly to: number
}

export function keyedAs(row: WorkTreeRow | undefined): Keyed | null {
  if (row === undefined || row.kind !== "intent") return null
  const mark = row.key.lastIndexOf(INTENT_MARK)
  if (mark < 1) return null
  const said = row.key.slice(mark + 1)
  if (!/^[0-9]+$/.test(said)) return null
  const place = Number(said)
  return place < 1 ? null : { slug: row.key.slice(0, mark), place }
}

export function orderingOf(
  dragged: readonly WorkTreeRow[],
  onto: WorkTreeRow | undefined
): Ordering | null {
  if (dragged.length !== 1) return null
  const one = keyedAs(dragged[0])
  const other = keyedAs(onto)
  if (one === null || other === null) return null
  if (one.slug !== other.slug || one.place === other.place) return null
  return { slug: one.slug, from: one.place, to: other.place }
}

export type HeldOrder = {
  readonly slug: string
  readonly labels: readonly string[]
}

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

export function agreementOf(there: readonly string[] | null, held: readonly string[]): Agreement {
  if (there === null || there.length !== held.length) return "gone"
  if (there.every((label, at) => label === held[at])) return "agrees"
  const one = [...there].sort()
  const other = [...held].sort()
  return one.every((label, at) => label === other[at]) ? "stale" : "gone"
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

export function reorderedTo(
  roots: readonly WorkTreeRow[],
  held: HeldOrder
): readonly WorkTreeRow[] {
  return roots.map((row) => {
    if (row.kind === "initiative" && row.key === held.slug) return reordered(row, held.labels)
    return { ...row, children: reorderedTo(row.children, held) }
  })
}

export function draggedIn(held: unknown): readonly WorkTreeRow[] {
  return Array.isArray(held) ? (held as readonly WorkTreeRow[]) : []
}

export function failureSaid(order: Ordering, why: string): string {
  return `${order.slug}: the intent at place ${order.from} did not move to place ${order.to}. ${why}`
}

export interface WorkDropWatch {
  readonly moving: (order: Ordering) => undefined
  readonly refused: (order: Ordering) => undefined
}

export function createWorkDragging(
  editor: typeof vscode,
  say: (line: string) => undefined,
  watch: WorkDropWatch
): vscode.TreeDragAndDropController<WorkTreeRow> {
  const dropped = async (order: Ordering): Promise<undefined> => {
    try {
      const said = await callHarness(
        MOVE_MODULE,
        MOVE_EXPORT,
        [order.slug, String(order.from), String(order.to)],
        { timeout: MOVE_TIMEOUT_MS }
      )
      say(`[drop] ${said.trim()}`)
    } catch (thrown) {
      watch.refused(order)
      const why = failureSaid(order, String(thrown))
      say(`[drop] ${why}`)
      void editor.window.showErrorMessage(`Work: ${why}`)
    }
    return undefined
  }
  return {
    dragMimeTypes: [DRAG_MIME],
    dropMimeTypes: [DRAG_MIME],
    handleDrag: (source, carried) => {
      carried.set(DRAG_MIME, new editor.DataTransferItem([...source]))
      return undefined
    },
    handleDrop: (target, carried) => {
      const held: unknown = carried.get(DRAG_MIME)?.value
      const order = orderingOf(draggedIn(held), target)
      if (order === null) return undefined
      watch.moving(order)
      void dropped(order)
      return undefined
    },
  }
}
