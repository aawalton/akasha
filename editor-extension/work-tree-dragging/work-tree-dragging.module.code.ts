import type * as vscode from "vscode"
import { callHarness, LANDING_TIMEOUT_MS } from "../harness-call/harness-call.module.code.ts"
import { VIEW_ID } from "../work-tree-ids/work-tree-ids.module.code.ts"

export const DRAG_MIME = `application/vnd.code.tree.${VIEW_ID.toLowerCase()}`

const MOVE_MODULE = "initiative-move-intent"

const MOVE_EXPORT = "initiativeMoveIntent"

const HAND_MODULE = "initiative-hand-intent"

const HAND_EXPORT = "initiativeHandIntent"

const INTENT_MARK = "#"

export type Keyed = {
  readonly slug: string
  readonly place: number
}

export type Ordering = {
  readonly slug: string
  readonly statement: string
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
  const row = dragged[0]
  const one = keyedAs(row)
  const other = keyedAs(onto)
  if (row === undefined || one === null || other === null || row.label === "") return null
  if (one.slug !== other.slug || one.place === other.place) return null
  return { slug: one.slug, statement: row.label, to: other.place }
}

export type Handing = {
  readonly from: string
  readonly statement: string
  readonly to: string
}

export function initiativeOf(onto: WorkTreeRow | undefined): string | null {
  if (onto === undefined) return null
  if (onto.kind === "initiative") return onto.key === "" ? null : onto.key
  return keyedAs(onto)?.slug ?? null
}

export function handingOf(
  dragged: readonly WorkTreeRow[],
  onto: WorkTreeRow | undefined
): Handing | null {
  if (dragged.length !== 1) return null
  const one = dragged[0]
  const keyed = keyedAs(one)
  if (one === undefined || keyed === null || one.label === "") return null
  const to = initiativeOf(onto)
  if (to === null || to === keyed.slug) return null
  return { from: keyed.slug, statement: one.label, to }
}

export type Dropped =
  | { readonly kind: "move"; readonly order: Ordering }
  | { readonly kind: "hand"; readonly handing: Handing }

export function droppedAs(
  dragged: readonly WorkTreeRow[],
  onto: WorkTreeRow | undefined
): Dropped | null {
  const order = orderingOf(dragged, onto)
  if (order !== null) return { kind: "move", order }
  const handing = handingOf(dragged, onto)
  return handing === null ? null : { kind: "hand", handing }
}

export function draggedIn(held: unknown): readonly WorkTreeRow[] {
  return Array.isArray(held) ? (held as readonly WorkTreeRow[]) : []
}

export function failureSaid(order: Ordering, why: string): string {
  return `${order.slug}: the intent \`${order.statement}\` did not move to place ${order.to}. ${why}`
}

export function handFailureSaid(handing: Handing, why: string): string {
  return `${handing.from}: the intent \`${handing.statement}\` did not reach ${handing.to}. ${why}`
}

export interface WorkDropWatch {
  readonly moving: (order: Ordering) => undefined
  readonly handing: (one: Handing) => undefined
  readonly refused: (slug: string) => undefined
}

export type Calling = (
  module: string,
  exported: string,
  args: readonly string[],
  options: { readonly timeout: number }
) => Promise<string>

export type Editor = {
  readonly window: {
    readonly showErrorMessage: (said: string) => unknown
  }
  readonly DataTransferItem: new (value: readonly WorkTreeRow[]) => vscode.DataTransferItem
}

export function createWorkDragging(
  editor: Editor,
  say: (line: string) => undefined,
  watch: WorkDropWatch,
  call: Calling = callHarness
): vscode.TreeDragAndDropController<WorkTreeRow> {
  const dropped = async (order: Ordering): Promise<undefined> => {
    try {
      const said = await call(
        MOVE_MODULE,
        MOVE_EXPORT,
        [order.slug, order.statement, String(order.to)],
        { timeout: LANDING_TIMEOUT_MS }
      )
      say(`[drop] ${said.trim()}`)
    } catch (thrown) {
      watch.refused(order.slug)
      const why = failureSaid(order, String(thrown))
      say(`[drop] ${why}`)
      void editor.window.showErrorMessage(`Work: ${why}`)
    }
    return undefined
  }

  const handed = async (handing: Handing): Promise<undefined> => {
    try {
      const said = await call(
        HAND_MODULE,
        HAND_EXPORT,
        [handing.from, handing.statement, handing.to],
        { timeout: LANDING_TIMEOUT_MS }
      )
      say(`[drop] ${said.trim()}`)
    } catch (thrown) {
      watch.refused(handing.from)
      const why = handFailureSaid(handing, String(thrown))
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
      const read = droppedAs(draggedIn(held), target)
      if (read === null) return undefined
      if (read.kind === "move") {
        watch.moving(read.order)
        void dropped(read.order)
        return undefined
      }
      watch.handing(read.handing)
      void handed(read.handing)
      return undefined
    },
  }
}
