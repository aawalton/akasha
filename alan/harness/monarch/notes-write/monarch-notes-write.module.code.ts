import type { MonarchTag, MonarchTransaction } from "../client/monarch-client.module.code.ts"
import { monarchQuery } from "../client/monarch-client.module.code.ts"
import { array, num, object, optional, str } from "../shape/monarch-shape.module.code.ts"

const UPDATE_NOTES = `mutation Web_TransactionDrawerUpdateTransaction($input: UpdateTransactionMutationInput!) {
  updateTransaction(input: $input) {
    transaction { id notes }
    errors { message fieldErrors { field messages } }
  }
}`

const SET_TAGS = `mutation Web_SetTransactionTags($input: SetTransactionTagsInput!) {
  setTransactionTags(input: $input) {
    transaction { id tags { id name color order } }
    errors { message fieldErrors { field messages } }
  }
}`

export type FetchDay = (window: {
  readonly startDate: string
  readonly endDate: string
}) => Promise<readonly MonarchTransaction[]>

function refused(payload: Record<string, unknown>, what: string): void {
  if (payload.errors != null) {
    throw new Error(`Monarch refused ${what}: ${JSON.stringify(payload.errors)}`)
  }
}

function readTags(value: unknown, path: string): readonly MonarchTag[] {
  return array(value ?? [], path).map((t, i) => {
    const tag = object(t, `${path}[${i}]`)
    return {
      id: str(tag.id, `${path}[${i}].id`),
      name: str(tag.name, `${path}[${i}].name`),
      color: optional(tag.color, `${path}[${i}].color`, str),
      order: optional(tag.order, `${path}[${i}].order`, num),
    }
  })
}

export async function liveTransaction(
  fetchDay: FetchDay,
  monarchId: string,
  date: string
): Promise<MonarchTransaction> {
  const day = await fetchDay({ startDate: date, endDate: date })
  const found = day.find((t) => t.id === monarchId)
  if (found === undefined) {
    throw new Error(
      `Monarch reported no transaction ${monarchId} on ${date}, so nothing was read to guard on`
    )
  }
  return found
}

export function mayWriteNotes(standing: string | null | undefined): boolean {
  return (standing ?? "").trim() === ""
}

export type NoteWrite =
  | {
      readonly wrote: true
      readonly stored: string
      readonly tags: readonly MonarchTag[]
      readonly before: MonarchTransaction
    }
  | {
      readonly wrote: false
      readonly standing: string
      readonly before: MonarchTransaction
    }

export async function writeNoteIfEmpty(
  auth: Readonly<Record<string, string>>,
  fetchDay: FetchDay,
  transactionId: string,
  date: string,
  notes: string
): Promise<NoteWrite> {
  const before = await liveTransaction(fetchDay, transactionId, date)
  if (!mayWriteNotes(before.notes)) {
    return { wrote: false, standing: before.notes ?? "", before }
  }
  const stored = await overwriteTransactionNotes(auth, transactionId, notes)
  const tags = await setTransactionTags(auth, transactionId, withAiTag(before.tags))
  return { wrote: true, stored, tags, before }
}

export async function overwriteTransactionNotes(
  auth: Readonly<Record<string, string>>,
  transactionId: string,
  notes: string
): Promise<string> {
  const data = await monarchQuery(auth, "Web_TransactionDrawerUpdateTransaction", UPDATE_NOTES, {
    input: { id: transactionId, notes },
  })
  const payload = object(data.updateTransaction, "updateTransaction")
  refused(payload, `updateTransaction ${transactionId}`)
  const transaction = object(payload.transaction, "updateTransaction.transaction")
  return optional(transaction.notes, "updateTransaction.transaction.notes", str) ?? ""
}

export const AI_TAG_ID = "251487307081586966"

export function withAiTag(standing: readonly MonarchTag[]): readonly string[] {
  return [...new Set([...standing.map((tag) => tag.id), AI_TAG_ID])]
}

export async function setTransactionTags(
  auth: Readonly<Record<string, string>>,
  transactionId: string,
  tagIds: readonly string[]
): Promise<readonly MonarchTag[]> {
  const data = await monarchQuery(auth, "Web_SetTransactionTags", SET_TAGS, {
    input: { transactionId, tagIds },
  })
  const payload = object(data.setTransactionTags, "setTransactionTags")
  refused(payload, `setTransactionTags ${transactionId}`)
  const transaction = object(payload.transaction, "setTransactionTags.transaction")
  return readTags(transaction.tags, "setTransactionTags.transaction.tags")
}
