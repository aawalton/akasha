import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const charactersHirelingMailCount = {
  id: "01a062ed-3966-7007-9279-aa90f8aed0c9",
  pageTypeSlug: "module",
  slug: "characters-hireling-mail-count",
  definition: "a day's tally of hireling mails looted, and the tally a day is done at",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A tally carrying yesterday's date counts as nothing looted today.",
    },
  ],
} as const satisfies Module
