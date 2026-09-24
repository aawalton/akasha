import type { TransactionCategory } from "akasha/alan/harness/monarch/category-rule/properties/transaction-category.relation-property.types.ts"
import type { Account } from "akasha/alan/harness/monarch/holding/properties/account.relation-property.types.ts"
import type { AccountName } from "akasha/alan/harness/monarch/month/properties/account-name.text-property.types.ts"
import type { AmazonOrderNumber } from "akasha/alan/harness/monarch/month/properties/amazon-order-number.text-property.types.ts"
import type { Amount } from "akasha/alan/harness/monarch/month/properties/amount.number-property.types.ts"
import type { CategoryDecidedBy } from "akasha/alan/harness/monarch/month/properties/category-decided-by.text-property.types.ts"
import type { CategorySource } from "akasha/alan/harness/monarch/month/properties/category-source.select-property.types.ts"
import type { Merchant } from "akasha/alan/harness/monarch/month/properties/merchant.text-property.types.ts"
import type { MonarchUpdatedAt } from "akasha/alan/harness/monarch/month/properties/monarch-updated-at.instant-property.types.ts"
import type { NeedsReview } from "akasha/alan/harness/monarch/month/properties/needs-review.boolean-property.types.ts"
import type { Pending } from "akasha/alan/harness/monarch/month/properties/pending.boolean-property.types.ts"
import type { Recurring } from "akasha/alan/harness/monarch/month/properties/recurring.boolean-property.types.ts"
import type { Split } from "akasha/alan/harness/monarch/month/properties/split.boolean-property.types.ts"
import type { StatementLine } from "akasha/alan/harness/monarch/month/properties/statement-line.text-property.types.ts"
import type { TransactionDay } from "akasha/alan/harness/monarch/month/properties/transaction-day.calendar-date-property.types.ts"
import type { TransactionNote } from "akasha/alan/harness/monarch/month/properties/transaction-note.text-property.types.ts"
import type { TransactionTags } from "akasha/alan/harness/monarch/month/properties/transaction-tags.relation-property.types.ts"
import type { MonarchId } from "akasha/alan/harness/monarch/record/properties/monarch-id.text-property.types.ts"
import type { Id } from "akasha/page/properties/id.text-property.types.ts"

export type Transactions = "jsonl"

export type TransactionsRow = {
  id: Id
  monarchId: MonarchId
  monarchUpdatedAt: MonarchUpdatedAt
  transactionDay: TransactionDay
  amount: Amount
  merchant: Merchant
  accountName: AccountName
  account: Account
  category: TransactionCategory
  statementLine?: StatementLine
  transactionNote?: TransactionNote
  categorySource?: CategorySource
  categoryDecidedBy?: CategoryDecidedBy
  amazonOrderNumber?: AmazonOrderNumber
  tags?: TransactionTags
  split?: Split
  recurring?: Recurring
  needsReview?: NeedsReview
  pending?: Pending
}
