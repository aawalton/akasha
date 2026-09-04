import type { SyncConfig } from "@tanstack/db"
import type { PageRow } from "../page-row/page-row.module.code.ts"

type SyncParams = Parameters<SyncConfig<PageRow, string>["sync"]>[0]

export interface PagesSyncController {
  readonly sync: SyncConfig<PageRow, string>["sync"]
  readonly seed: (rows: readonly PageRow[]) => undefined
  readonly applyUpserts: (rows: readonly PageRow[]) => undefined
  readonly applyDeletes: (ids: readonly string[]) => undefined
  readonly resetAll: () => undefined
  readonly isReady: () => boolean
}

export function createPagesSyncController(onMutation?: () => undefined): PagesSyncController {
  let handles: SyncParams | null = null

  const sync: SyncConfig<PageRow, string>["sync"] = (params) => {
    handles = params
    params.markReady()
    return () => {
      handles = null
    }
  }

  const requireHandles = (): SyncParams => {
    if (handles === null) {
      throw new Error(
        "PagesSyncController: push before the collection started syncing (sync handles not captured)"
      )
    }
    return handles
  }

  const writeAll = (rows: readonly PageRow[], type: "insert" | "update"): undefined => {
    const h = requireHandles()
    if (rows.length === 0) return
    h.begin()
    for (const row of rows) h.write({ type, value: row })
    h.commit()
    onMutation?.()
  }

  return {
    sync,
    seed: (rows) => writeAll(rows, "insert"),
    applyUpserts: (rows) => writeAll(rows, "update"),
    applyDeletes: (ids) => {
      const h = requireHandles()
      if (ids.length === 0) return
      h.begin()
      for (const id of ids) h.write({ type: "delete", key: id })
      h.commit()
      onMutation?.()
    },
    resetAll: () => {
      const h = requireHandles()
      h.begin()
      h.truncate()
      h.commit()
      onMutation?.()
    },
    isReady: () => handles !== null,
  }
}
