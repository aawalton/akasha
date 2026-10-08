import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inboxKeys = {
  id: "01a069b6-bb6b-72d1-9b42-d54723ee2e36",
  type: "page-type/module",
  slug: "inbox-keys",
  definition: "the inboxes counted, and the day-page key for each count and each clearing",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every inbox that is counted is named here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An inbox with no key here is written to the day under a rule of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The gaps and the refusals each have a count key and no clearing key.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here counts anything or writes anything.",
    },
  ],
  createdAt: "2026-09-03T23:59:38.347Z",
  updatedAt: "2026-09-25T15:35:18.000Z",
} as const satisfies Module
