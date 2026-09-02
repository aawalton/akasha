import type { Module } from "@akasha/code-system/module"

export const mapPinsPiecesOfHistory = {
  id: "01a06269-2ae4-7814-bfcb-6c60e5485e60",
  pageTypeSlug: "module",
  slug: "map-pins-pieces-of-history",
  definition: "the pieces-of-history places",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
