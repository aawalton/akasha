import type { Module } from "@akasha/code-system/module"

export const mapPinsHelpers = {
  id: "01a06062-57de-7676-a2c3-268d8233dc41",
  pageTypeSlug: "module",
  slug: "map-pins-helpers",
  definition: "the pin type and map filter group lookups the rest of the library reads",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A pin type named by a string is looked up in the game's global table.",
    },
  ],
} as const satisfies Module
