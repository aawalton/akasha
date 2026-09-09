import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchSync = {
  id: "01a06868-1536-78a0-ac3e-855101a65f64",
  pageTypeSlug: "module",
  type: "module",
  slug: "monarch-sync",
  definition:
    "the whole of Monarch copied, compared against itself, and the rules run over what arrived",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The full pass repairs the minutely poll.",
    },
    {
      invariantKind: "departure",
      statement: "Accounts land before transactions.",
    },
    {
      invariantKind: "departure",
      statement: "A transaction always has an account to name.",
    },
    {
      invariantKind: "departure",
      statement: "Only the tags the fetched transactions actually have are landed.",
    },
    {
      invariantKind: "departure",
      statement: "A failing account does not stop the other accounts.",
    },
    {
      invariantKind: "departure",
      statement: "Every failure is caught and named.",
    },
    {
      invariantKind: "departure",
      statement: "The run ends non-zero once every account has been tried.",
    },

    {
      invariantKind: "departure",
      statement: "Our copy is compared against Monarch after the landing rather than before.",
    },
    {
      invariantKind: "departure",
      statement: "A comparison that cannot be made is said and does not stop the run.",
    },
    {
      invariantKind: "departure",
      statement:
        "A row claimed by more than one rule leaves the run non-zero after everything else is done.",
    },
  ],
} as const satisfies Module
