
import type { MonarchTransaction } from "./client.ts"
import type { Movement } from "./amazon-match.ts"
import type { FetchDay } from "./notes-write.ts"
import { AI_TAG_ID, liveTransaction, mayWriteNotes, writeNoteIfEmpty } from "./notes-write.ts"
import { findTransaction } from "./files.ts"
import { patchTransactionLines } from "./land-files.ts"

export const AMAZON_SINCE = "2025-01-01"

export const isAmazon = (t: MonarchTransaction): boolean =>
  (t.merchant?.name ?? "").toLowerCase().includes("amazon")

export function landed(stored: string | null, orderNumber: string): boolean {
  return (stored ?? "").trim() !== "" && (stored ?? "").trimEnd().endsWith(orderNumber)
}

export async function recordOrderNumber(monarchId: string, orderNumber: string): Promise<boolean> {
  const placed = await findTransaction(monarchId)
  if (placed === null) throw new Error(`no month sidecar carries transaction ${monarchId}`)
  if (placed.line.amazonOrderNumber === orderNumber) return false
  await patchTransactionLines(
    new Map([[monarchId, { amazonOrderNumber: orderNumber }]]),
    `monarch: transaction ${monarchId} carries Amazon order ${orderNumber}`
  )
  const back = (await findTransaction(monarchId))?.line.amazonOrderNumber
  if (back !== orderNumber) {
    throw new Error(
      `the line for ${monarchId} read back ${JSON.stringify(back)} rather than ${orderNumber}, ` +
        "so Monarch carries the note and the file does not say which order it came from"
    )
  }
  return true
}

export interface WriteContext {
  readonly auth: Readonly<Record<string, string>>
  readonly fetchDay: FetchDay
  readonly writing: boolean
}

export type Applied =
  | { readonly kind: "wrote"; readonly note: string; readonly tagCount: number; readonly respelled: boolean }
  | { readonly kind: "would-write"; readonly note: string }
  | { readonly kind: "declined"; readonly standing: string; readonly repaired: boolean }
  | { readonly kind: "would-decline"; readonly standing: string }

export async function applyNote(
  context: WriteContext,
  movement: Movement,
  orderNumber: string,
  note: string
): Promise<Applied> {
  const { auth, fetchDay, writing } = context
  if (!writing) {
    const live = await liveTransaction(fetchDay, movement.monarchId, movement.date)
    if (!mayWriteNotes(live.notes)) return { kind: "would-decline", standing: live.notes ?? "" }
    return { kind: "would-write", note }
  }
  const outcome = await writeNoteIfEmpty(auth, fetchDay, movement.monarchId, movement.date, note)
  if (!outcome.wrote) {
    const repaired =
      landed(outcome.standing, orderNumber) && (await recordOrderNumber(movement.monarchId, orderNumber))
    return { kind: "declined", standing: outcome.standing, repaired }
  }
  const back = await liveTransaction(fetchDay, movement.monarchId, movement.date)
  const tagged = back.tags.some((g) => g.id === AI_TAG_ID)
  if (!landed(outcome.stored, orderNumber) || !landed(back.notes, orderNumber) || !tagged) {
    throw new Error(
      `${movement.monarchId} did not read back as written: notes=${JSON.stringify(back.notes)} ` +
        `tags=[${back.tags.map((g) => g.id)}]`
    )
  }
  await recordOrderNumber(movement.monarchId, orderNumber)
  return { kind: "wrote", note, tagCount: outcome.tags.length, respelled: (back.notes ?? "") !== note }
}
