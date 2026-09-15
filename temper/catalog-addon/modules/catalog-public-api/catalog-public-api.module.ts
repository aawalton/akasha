import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const catalogPublicApi = {
  id: "01a063ba-94e5-75b2-87c7-9dffc0a06b28",
  type: "module",
  slug: "catalog-public-api",
  definition: "the global another add-on reaches the collected catalog table through",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The global is named for the addon.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The global has the one reader and nothing more.",
    },
  ],
} as const satisfies Module
