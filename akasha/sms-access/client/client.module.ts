import type { Module } from "../../code-system/module/module.page-type.ts"

export const client = {
  id: "01a05b73-2ec7-7832-b9b0-90ed955477ea",
  pageTypeSlug: "module",
  slug: "client",
  definition: "the Supabase client this package is handed",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here stands at runtime.",
    },
  ],
} as const satisfies Module
