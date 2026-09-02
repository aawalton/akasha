import type { Module } from "@akasha/code-system/module"

export const mapPinsSkyShards00 = {
  id: "01a06269-2af5-70e7-82e3-26daaa80a68d",
  pageTypeSlug: "module",
  slug: "map-pins-sky-shards-00",
  definition: "one run of the skyshard places by zone",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The records here are one unbroken run of the table's order.",
    },
    {
      invariantKind: "departure",
      statement: "The run is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
