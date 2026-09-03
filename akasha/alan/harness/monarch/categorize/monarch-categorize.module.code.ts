#!/usr/bin/env bun

import { monarchClient, monarchQuery } from "../client/monarch-client.module.code.ts"
import { monarchHeaders } from "../credential/monarch-credential.module.code.ts"
import type { TransactionLine } from "../files/monarch-files.module.code.ts"
import { categoryPages, findTransaction, keyOf } from "../files/monarch-files.module.code.ts"
import { patchTransactionLines } from "../land-files/monarch-land-files.module.code.ts"
import {
  liveTransaction,
  setTransactionTags,
  withAiTag,
} from "../notes-write/monarch-notes-write.module.code.ts"
import { object, str } from "../shape/monarch-shape.module.code.ts"

const UPDATE_TRANSACTION = `mutation Web_TransactionDrawerUpdateTransaction($input: UpdateTransactionMutationInput!) {
  updateTransaction(input: $input) {
    transaction { id category { id name } }
    errors { message fieldErrors { field messages } }
  }
}`

async function postCategory(
  auth: Readonly<Record<string, string>>,
  transactionId: string,
  categoryId: string
): Promise<string> {
  const data = await monarchQuery(
    auth,
    "Web_TransactionDrawerUpdateTransaction",
    UPDATE_TRANSACTION,
    { input: { id: transactionId, category: categoryId } }
  )
  const payload = object(data.updateTransaction, "updateTransaction")
  if (payload.errors != null) {
    throw new Error(
      `Monarch refused updateTransaction ${transactionId}: ${JSON.stringify(payload.errors)}`
    )
  }
  const transaction = object(payload.transaction, "updateTransaction.transaction")
  if (transaction.category == null) {
    throw new Error(
      `Monarch accepted updateTransaction ${transactionId} and reported no category back, so ` +
        "nothing confirms the one thing the call was for"
    )
  }
  const category = object(transaction.category, "updateTransaction.transaction.category")
  return str(category.name, "updateTransaction.transaction.category.name")
}

import type {
  CategoryDecision,
  DecidedSource,
} from "../provenance/monarch-provenance.module.code.ts"
import { recordDecision } from "../provenance/monarch-provenance.module.code.ts"

const SOURCES: readonly DecidedSource[] = [
  "programmatic-categorization",
  "semantic-categorization",
  "manual-categorization",
]

export async function categorySlugByMonarchId(categoryMonarchId: string): Promise<string> {
  const found = (await categoryPages()).filter(
    (page) => keyOf(page, "monarchId") === categoryMonarchId
  )
  if (found.length !== 1) {
    throw new Error(
      `monarch-category monarch-id=${categoryMonarchId} resolved ${found.length} files, ` +
        "expected exactly 1"
    )
  }
  const page = found[0]
  if (page === undefined) throw new Error(`category ${categoryMonarchId} came back empty`)
  return page.slug
}

export async function setCategory(
  transactionMonarchId: string,
  categoryMonarchId: string,
  decision: CategoryDecision
): Promise<TransactionLine> {
  const categorySlug = await categorySlugByMonarchId(categoryMonarchId)
  const placed = await findTransaction(transactionMonarchId)
  if (placed === null) {
    throw new Error(`no month sidecar carries transaction ${transactionMonarchId}`)
  }
  const recorded = recordDecision(decision)

  const auth = await monarchHeaders()
  const monarch = monarchClient(auth)
  const before = await liveTransaction(
    monarch.transactions,
    transactionMonarchId,
    placed.line.transactionDay
  )
  await postCategory(auth, transactionMonarchId, categoryMonarchId)
  await setTransactionTags(auth, transactionMonarchId, withAiTag(before.tags))

  const patch = { categorySlug, ...recorded }
  const touched = await patchTransactionLines(
    new Map([[transactionMonarchId, patch]]),
    `monarch: transaction ${transactionMonarchId} categorized as ${categorySlug}`
  )
  if (touched.length === 0 && placed.line.categorySlug !== categorySlug) {
    throw new Error(
      `Monarch took the category for transaction ${transactionMonarchId} and no month file ` +
        "moved, so the two now disagree until the next sync"
    )
  }
  return { ...placed.line, ...patch }
}

function readSource(argument: string | undefined): DecidedSource {
  const found = SOURCES.find((source) => source === argument)
  if (found === undefined) {
    throw new Error(`source must be one of ${SOURCES.join(", ")} — got ${String(argument)}`)
  }
  return found
}

if (import.meta.main) {
  const [transactionId, categoryId, source, ...decidedBy] = process.argv.slice(2)
  if (transactionId === undefined || categoryId === undefined) {
    throw new Error(
      "usage: categorize.ts <transaction-monarch-id> <category-monarch-id> <source> <what decided>"
    )
  }
  const line = await setCategory(transactionId, categoryId, {
    source: readSource(source),
    decidedBy: decidedBy.join(" "),
  })
  console.log(JSON.stringify(line, null, 2))
}
