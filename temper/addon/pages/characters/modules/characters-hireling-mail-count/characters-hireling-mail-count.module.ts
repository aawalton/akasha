import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersHirelingMailCount = {
  id: "01a062ed-3966-7007-9279-aa90f8aed0c9",
  type: "page-type/module",
  slug: "characters-hireling-mail-count",
  definition: "a day's tally of hireling mails looted, and the tally at which a day is done",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A tally with yesterday's date counts as nothing looted today.",
    },
  ],
} as const satisfies Module
