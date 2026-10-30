import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchSync = {
  id: "01a06868-1536-78a0-ac3e-855101a65f64",
  type: "page-type/module",
  slug: "monarch-sync",
  definition: "how code writes every Monarch record into akasha",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The full pass repairs the minutely poll.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Accounts land before transactions.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A transaction always has an account to name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the tags the fetched transactions actually have are landed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A failing account does not stop the other accounts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every failure is caught and named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The run ends non-zero once every account has been tried.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "Our copy is compared against Monarch after the landing rather than before.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A comparison that cannot be made is said and does not stop the run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A row claimed by more than one rule leaves the run non-zero after everything else is done.",
    },
  ],
  createdAt: "2026-09-03T17:54:06.774Z",
  updatedAt: "2026-10-30T15:41:46.104Z",
} as const satisfies Module
