import type { Module } from "../../code-system/modules/module.page-type.ts"

export const supabaseUser = {
  id: "01a05c6d-350a-7a9e-b989-5c974158f6f9",
  pageTypeSlug: "module",
  slug: "supabase-user",
  definition: "who Supabase says a user is, narrowed to the id and the address",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing Supabase holds about a user beyond these two is carried.",
    },
  ],
} as const satisfies Module
