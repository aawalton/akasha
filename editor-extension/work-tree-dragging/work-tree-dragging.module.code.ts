import type * as vscode from "vscode"
import { callHarness, LANDING_TIMEOUT_MS } from "../harness-call/harness-call.module.code.ts"
import { VIEW_ID } from "../work-tree-ids/work-tree-ids.module.code.ts"

export const DRAG_MIME = `application/vnd.code.tree.${VIEW_ID.toLowerCase()}`

const MOVE_MODULE = "initiative-move-intent"

const MOVE_EXPORT = "initiativeMoveIntent"

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
        { timeout: LANDING_TIMEOUT_MS }
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
