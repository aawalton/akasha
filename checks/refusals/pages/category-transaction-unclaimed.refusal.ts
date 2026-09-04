import type { Refusal } from "../refusal.page-type.ts"

export const categoryTransactionUnclaimed = {
  id: "01a06611-3984-7da5-ac94-b9c5f9324309",
  pageTypeSlug: "refusal",
  slug: "category-transaction-unclaimed",
  title: "Category transaction unclaimed",
  text: "No rule under {folder} claims this transaction: {transaction}.\n\n`pages/domain/rules-engine.domain.md` settles what a rule set owes over everything it judges, and a transaction none of its rules claims is one it does not judge at all. Nothing decides it and nothing reports that nothing did — it arrives uncategorized beside the ones a person was meant to look at, and reads as a transaction awaiting judgment rather than as a gap in the rules.\n\nThe transaction is spelled out of the values the rules themselves compare against, so it is a transaction rather than an example: `some other account` and an empty field stand where nothing any rule names is to hold.\n\nWhere a narrowed rule leaves the rest of its merchant unclaimed, the rule claiming that rest states the same merchant, negates what the narrow one requires, and settles a person rather than a category. At most five are named on a run, so closing these may leave more behind them.",
} as const satisfies Refusal
