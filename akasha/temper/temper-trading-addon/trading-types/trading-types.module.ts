import type { Module } from "@akasha/code-system/module"

export const tradingTypes = {
  id: "01a06160-2a5e-7579-bb70-416bf4fbc1c8",
  pageTypeSlug: "module",
  slug: "trading-types",
  definition: "the shapes a guild snapshot and a last-sold record are held in",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here runs.",
    },
  ],
} as const satisfies Module
