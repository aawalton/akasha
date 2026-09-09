import type { Module } from "@akasha/code/module"

export const inboxKeys = {
  id: "01a069b6-bb6b-72d1-9b42-d54723ee2e36",
  pageTypeSlug: "module",
  type: "module",
  slug: "inbox-keys",
  definition:
    "the inboxes counted, and the day-page key each count and each clearing is written under",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every inbox that is counted is named here.",
    },
    {
      invariantKind: "departure",
      statement: "An inbox with no key here is written to the day under a rule of its own.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here counts anything or writes anything.",
    },
  ],
} as const satisfies Module
