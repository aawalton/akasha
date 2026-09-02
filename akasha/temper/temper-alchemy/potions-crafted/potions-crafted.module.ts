import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const potionsCrafted = {
  id: "01a06076-1b6a-7cba-9441-c81e409dbcd4",
  pageTypeSlug: "module",
  slug: "potions-crafted",
  definition: "every crafted essence, gathered into one table",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A crafted potion's place in this table is the index a build hash carries.",
    },
    {
      invariantKind: "gap",
      statement: "A crafted potion moved to another place breaks every build hash saved.",
    },
  ],
} as const satisfies Module
