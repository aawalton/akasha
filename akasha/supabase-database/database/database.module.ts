import type { Module } from "../../code-system/module/module.page-type.ts"

export const database = {
  id: "01a05c5c-1e3e-7960-b5e3-72d070ca07d3",
  pageTypeSlug: "module",
  slug: "database",
  definition: "the `Database` type Supabase emitted for Alan's database",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The four shards beside this module are reached from here and nowhere else.",
    },
    {
      invariantKind: "departure",
      statement: "`Database` is handed on exactly as Supabase emitted it.",
    },
    {
      invariantKind: "absence",
      statement: "`Json` is not sent on from here.",
    },
    {
      invariantKind: "absence",
      statement: "The empty `Constants` Supabase emits does not stand here.",
    },
    {
      invariantKind: "stopgap",
      statement: "A fresh Supabase dump is pasted in and split by hand.",
    },
  ],
} as const satisfies Module
