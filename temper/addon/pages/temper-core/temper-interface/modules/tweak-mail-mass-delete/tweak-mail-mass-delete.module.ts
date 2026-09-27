import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tweakMailMassDelete = {
  id: "01a06115-1acd-7d48-8f9d-df4974dd41b6",
  type: "page-type/module",
  slug: "tweak-mail-mass-delete",
  definition: "deleting many mails in one pass",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game drops a player who sends more than 100 actions in 10 seconds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "With no delay set, mails are deleted at once until 95 went in the last 10.5 seconds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At that count the next deletion waits for the oldest of them to age out.",
    },
  ],
} as const satisfies Module
