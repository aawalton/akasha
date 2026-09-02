import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionAccountCheckers = {
  id: "01a0640c-1e9b-77aa-9215-d1a1abde163f",
  pageTypeSlug: "module",
  slug: "completion-account-checkers",
  definition: "what answers whether an account has finished each account-wide completion card",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A checker here is built from a catalog handed in rather than one imported.",
    },
    {
      invariantKind: "departure",
      statement: "The achievement catalog is held addon-side.",
    },
    {
      invariantKind: "stopgap",
      statement: "The registry names no account card.",
    },
    {
      invariantKind: "gap",
      statement: "The registry names every account card the category tree holds.",
    },
  ],
} as const satisfies Module
