import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const header = {
  id: "01a06053-3637-756b-93c2-519e609ad2d8",
  pageTypeSlug: "module",
  slug: "header",
  definition: "a line naming the group of settings that follows it",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "A header carries no setting of its own.",
    },
  ],
} as const satisfies Module
