import type { SyncConfig } from "@tanstack/db"
import {
  type PageRow,
  pageRowKey,
} from "akasha/page/ui-store/collection/modules/page-row/page-row.module.code.ts"

type SyncParams = Parameters<SyncConfig<PageRow, string>["sync"]>[0]

export interface PagesSyncController {
  readonly sync: SyncConfig<PageRow, string>["sync"]
  readonly seed: (rows: readonly PageRow[]) => undefined
  readonly applyUpserts: (rows: readonly PageRow[]) => undefined
  readonly applyDeletes: (ids: readonly string[]) => undefined
  readonly resetAll: () => undefined
  readonly isReady: () => boolean
}

export function createPagesSyncController(): PagesSyncController {
  let handles: SyncParams | null = null
  const held = new Map<string, PageRow>()

  const sync: SyncConfig<PageRow, string>["sync"] = (params) => {
    handles = params
    if (held.size > 0) {
      params.begin()
      for (const row of held.values()) params.write({ type: "insert", value: row })
      params.commit()
      held.clear()
    }
    params.markReady()
    return () => {
      handles = null
    }
  }

  const writeAll = (rows: readonly PageRow[], type: "insert" | "update"): undefined => {
    if (rows.length === 0) return
    if (handles === null) {
      for (const row of rows) held.set(pageRowKey(row), row)
      return
    }
    handles.begin()
    for (const row of rows) handles.write({ type, value: row })
    handles.commit()
  }

  return {
    sync,
    seed: (rows) => writeAll(rows, "insert"),
    applyUpserts: (rows) => writeAll(rows, "update"),
    applyDeletes: (ids) => {
      if (ids.length === 0) return
      if (handles === null) {
        for (const id of ids) held.delete(id)
        return
      }
      handles.begin()
      for (const id of ids) handles.write({ type: "delete", key: id })
      handles.commit()
    },
    resetAll: () => {
      if (handles === null) {
        held.clear()
        return
      }
      handles.begin()
      handles.truncate()
      handles.commit()
    },
    isReady: () => handles !== null,
  }
}
