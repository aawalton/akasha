import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const claims = {
  id: "01a05c6d-3509-7148-94be-e982b26664f6",
  type: "page-type/module",
  slug: "claims",
  definition: "the signed claims a Supabase token has, read into a user or refused",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Claims that do not parse make no user.",
    },
  ],
} as const satisfies Module
