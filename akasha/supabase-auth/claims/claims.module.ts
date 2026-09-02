import type { Module } from "../../code-system/modules/module.page-type.ts"

export const claims = {
  id: "01a05c6d-3509-7148-94be-e982b26664f6",
  pageTypeSlug: "module",
  slug: "claims",
  definition: "the signed claims a Supabase token carries, read into a user or refused",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Claims that do not parse make no user.",
    },
  ],
} as const satisfies Module
