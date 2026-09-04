import type { Module } from "../../code-system/modules/module.page-type.ts"

export const totals = {
  id: "01a05b70-a58d-7bd2-900d-e4f28509124a",
  pageTypeSlug: "module",
  slug: "totals",
  definition: "whether a persona's computed total replaces the total already stored",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A forced write replaces the stored total whatever the stored total holds.",
    },
    {
      invariantKind: "departure",
      statement: "A persona with nothing stored yet takes the computed total.",
    },
  ],
} as const satisfies Module
