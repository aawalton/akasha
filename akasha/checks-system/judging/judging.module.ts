import type { Module } from "../../code-system/module/module.page-type.ts"

export const judging = {
  id: "01a04bc4-7e86-7fa6-8d9b-5532730b7daf",
  pageTypeSlug: "module",
  slug: "judging",
  definition: "the refusals a check answers with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Nothing here imports a check or a door.",
    },
  ],
} as const satisfies Module
