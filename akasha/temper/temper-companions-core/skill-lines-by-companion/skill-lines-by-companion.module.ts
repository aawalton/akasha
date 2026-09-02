import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const skillLinesByCompanion = {
  id: "01a06110-abe5-7321-989c-62b7829a7f4b",
  pageTypeSlug: "module",
  slug: "skill-lines-by-companion",
  definition: "every companion skill line beside the companion owning it, or beside all of them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written out from the companion pages rather than by hand.",
    },
  ],
} as const satisfies Module
