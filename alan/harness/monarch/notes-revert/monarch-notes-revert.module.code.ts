import { existsSync, readFileSync, writeFileSync } from "node:fs"
import type { MonarchTransaction } from "../client/monarch-client.module.code.ts"
import type { FetchDay } from "../notes-write/monarch-notes-write.module.code.ts"
import {
  liveTransaction,
  overwriteTransactionNotes,
  setTransactionTags,
} from "../notes-write/monarch-notes-write.module.code.ts"

export const SNAPSHOT_PATH = `${process.env.HOME ?? "/home/walton"}/monarch-notes-snapshot-18168.json`

export interface SnapshotRow {
  readonly monarchId: string
  readonly date: string
  readonly amount: number
  readonly notes: string | null
  readonly tagIds: readonly string[]
}

export function snapshotRow(t: MonarchTransaction): SnapshotRow {
  return {
    monarchId: t.id,
    date: t.date,
    amount: t.amount,
    notes: t.notes,
    tagIds: t.tags.map((g) => g.id),
  }
}

export function heldSnapshot(): readonly SnapshotRow[] {
  return JSON.parse(readFileSync(SNAPSHOT_PATH, "utf8")) as SnapshotRow[]
}

export function takeSnapshot(population: readonly MonarchTransaction[]): void {
  if (!existsSync(SNAPSHOT_PATH)) {
    writeFileSync(SNAPSHOT_PATH, JSON.stringify(population.map(snapshotRow), null, 1))
    console.log(`snapshot: ${population.length} transaction(s) written to ${SNAPSHOT_PATH}`)
    return
  }
  const held = heldSnapshot()
  console.log(`snapshot: ${SNAPSHOT_PATH} already holds ${held.length} row(s) and is left alone`)
  const missing = population.filter((t) => !held.some((h) => h.monarchId === t.id)).length
  if (missing > 0) {
    console.log(`  ${missing} transaction(s) postdate it and have no before-picture`)
  }
}

export async function revertFromSnapshot(
  auth: Readonly<Record<string, string>>,
  fetchDay: FetchDay,
  options: { readonly only: string | null; readonly writing: boolean }
): Promise<number> {
  const held = heldSnapshot()
  const targets = held.filter((r) => options.only === null || r.monarchId === options.only)
  console.log(`revert: ${targets.length} transaction(s) from ${SNAPSHOT_PATH}`)
  let moved = 0
  for (const before of targets) {
    const live = await liveTransaction(fetchDay, before.monarchId, before.date)
    const sameNotes = (live.notes ?? "") === (before.notes ?? "")
    const sameTags = live.tags.map((g) => g.id).join(",") === before.tagIds.join(",")
    if (sameNotes && sameTags) continue
    if (!options.writing) {
      console.log(
        `  ${before.monarchId} would go back to notes=${JSON.stringify(before.notes ?? "")} ` +
          `tags=[${before.tagIds.join(",")}]`
      )
      continue
    }
    const notes = await overwriteTransactionNotes(auth, before.monarchId, before.notes ?? "")
    const tags = await setTransactionTags(auth, before.monarchId, before.tagIds)
    moved += 1
    console.log(
      `  ${before.monarchId} reverted: notes=${JSON.stringify(notes)} ` +
        `tags=[${tags.map((g) => g.id).join(",")}]`
    )
  }
  console.log(
    `revert: ${moved} transaction(s) moved, ${targets.length - moved} already as snapshotted`
  )
  return moved
}
