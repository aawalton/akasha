import type { Module } from "@akasha/code-system/module"

export const mapPinsBosses = {
  id: "01a06269-2a4d-7a4c-9b61-631eb4560cd7",
  pageTypeSlug: "module",
  slug: "map-pins-bosses",
  definition: "the world boss places by zone, joined from its runs",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the runs joined in order.",
    },
  ],
} as const satisfies Module
