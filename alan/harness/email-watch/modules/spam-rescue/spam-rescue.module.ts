import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const spamRescue = {
  id: "01a11c54-9b11-738e-8975-fe9437685abf",
  type: "page-type/module",
  slug: "spam-rescue",
  definition: "how code moves a new message from spam into the inbox where an email rule asks",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A message is rescued where the first rule it matches states a rescue from spam.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rescued message loses the spam label and gains the inbox label.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only spam that arrived within the last hour is looked at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Spam is not listed where no rule states a rescue from spam.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message gone from the mailbox before it is read is passed over.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here carries out what the rule says beyond the rescue.",
    },
  ],
  createdAt: "2026-10-08T16:24:29.200Z",
  updatedAt: "2026-10-30T15:35:59.136Z",
} as const satisfies Module
