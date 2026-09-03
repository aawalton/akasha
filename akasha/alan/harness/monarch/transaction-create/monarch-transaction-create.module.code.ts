import { monarchQuery } from "../client/monarch-client.module.code.ts"
import { setTransactionTags, withAiTag } from "../notes-write/monarch-notes-write.module.code.ts"
import { object, str } from "../shape/monarch-shape.module.code.ts"

const CREATE_TRANSACTION = `mutation Common_CreateTransactionMutation($input: CreateTransactionMutationInput!) {
  createTransaction(input: $input) {
    transaction { id }
    errors { message fieldErrors { field messages } }
  }
}`

export interface NewTransaction {
  readonly date: string
  readonly accountId: string
  readonly categoryId: string
  readonly amount: number
  readonly merchantName: string
  readonly shouldUpdateBalance?: boolean
  readonly notes?: string
}

function refused(payload: Record<string, unknown>, what: string): void {
  if (payload.errors != null) {
    throw new Error(`Monarch refused ${what}: ${JSON.stringify(payload.errors)}`)
  }
}

export async function createTransaction(
  auth: Readonly<Record<string, string>>,
  txn: NewTransaction
): Promise<string> {
  if (txn.amount === 0) {
    throw new Error(`a zero-amount transaction moves no budget: ${JSON.stringify(txn)}`)
  }
  const data = await monarchQuery(auth, "Common_CreateTransactionMutation", CREATE_TRANSACTION, {
    input: {
      date: txn.date,
      shouldUpdateBalance: txn.shouldUpdateBalance ?? true,
      merchantName: txn.merchantName,
      accountId: txn.accountId,
      ownerUserId: null,
      categoryId: txn.categoryId,
      amount: txn.amount,
      ...(txn.notes === undefined ? {} : { notes: txn.notes }),
    },
  })
  const payload = object(data.createTransaction, "createTransaction")
  refused(payload, `createTransaction ${txn.date} ${txn.amount} ${txn.merchantName}`)
  const transaction = object(payload.transaction, "createTransaction.transaction")
  const id = str(transaction.id, "createTransaction.transaction.id")
  try {
    await setTransactionTags(auth, id, withAiTag([]))
  } catch (error) {
    throw new Error(
      `Monarch created transaction ${id} (${txn.date} ${txn.amount} ${txn.merchantName}) and then ` +
        `refused the AI tag on it, so the row stands unmarked: ${String(error)}`
    )
  }
  return id
}

export interface BudgetTransfer {
  readonly date: string
  readonly accountId: string
  readonly fromCategoryId: string
  readonly toCategoryId: string
  readonly amount: number
  readonly merchantName: string
}

export async function transferBudget(
  auth: Readonly<Record<string, string>>,
  transfer: BudgetTransfer
): Promise<readonly [string, string]> {
  if (transfer.amount <= 0) {
    throw new Error(`a transfer moves a positive amount — got ${transfer.amount}`)
  }
  if (transfer.fromCategoryId === transfer.toCategoryId) {
    throw new Error(
      `a transfer between one category and itself writes two rows that cancel: ${transfer.fromCategoryId}`
    )
  }
  const debit = await createTransaction(auth, {
    date: transfer.date,
    accountId: transfer.accountId,
    categoryId: transfer.fromCategoryId,
    amount: -transfer.amount,
    merchantName: transfer.merchantName,
  })
  const credit = await createTransaction(auth, {
    date: transfer.date,
    accountId: transfer.accountId,
    categoryId: transfer.toCategoryId,
    amount: transfer.amount,
    merchantName: transfer.merchantName,
  })
  return [debit, credit]
}
