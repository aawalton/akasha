import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const charactersAllianceRank = {
  id: "01a062d2-92a3-7001-b3e4-020158355e21",
  pageTypeSlug: "module",
  slug: "characters-alliance-rank",
  definition: "the alliance rank of the character now played, read into the saved table",
  code: "ts",
} as const satisfies Module
