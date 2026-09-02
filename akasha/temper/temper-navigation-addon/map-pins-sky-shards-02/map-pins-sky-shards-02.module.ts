import type { Module } from "@akasha/code-system/module"

export const mapPinsSkyShards02 = {
  id: "01a06269-2af7-7c0b-bfab-7969ede0a76e",
  pageTypeSlug: "module",
  slug: "map-pins-sky-shards-02",
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
