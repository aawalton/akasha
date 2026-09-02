import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionTributeProgress = {
  id: "01a06358-4f7c-767d-9800-fc99c1ab7ec7",
  pageTypeSlug: "module",
  slug: "completion-tribute-progress",
  definition:
    "how much of every Tales of Tribute patron deck an account holds, patron by patron and card by card",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The patron catalog arrives as an argument rather than as an imported table.",
    },
    {
      invariantKind: "departure",
      statement: "A patron's total counts the patron beside each card the patron holds.",
    },
    {
      invariantKind: "departure",
      statement: "A card the account never upgraded counts as not upgraded.",
    },
    {
      invariantKind: "constraint",
      statement: "An empty catalog answers an empty progress.",
    },
  ],
} as const satisfies Module
