import type { Module } from "@akasha/code-system/module"

export const mapPinsPsijicMap = {
  id: "01a06269-2ae7-7758-9782-9ba54b0df1da",
  pageTypeSlug: "module",
  slug: "map-pins-psijic-map",
  definition: "the psijic time breach maps",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
