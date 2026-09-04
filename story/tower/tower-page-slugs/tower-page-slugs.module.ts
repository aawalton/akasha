import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const towerPageSlugs = {
  id: "01a05bc6-fa4a-700c-928f-9eea89b4ecad",
  pageTypeSlug: "module",
  slug: "tower-page-slugs",
  definition: "the slugs the tower's own pages stand under",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A slug the tower stores under is written here once and read everywhere else.",
    },
  ],
} as const satisfies Module
