import type { Module } from "@akasha/code-system/module"

export const zonePublicApi = {
  id: "01a061e7-9336-72de-8b6e-4e0717e35ed6",
  pageTypeSlug: "module",
  slug: "zone-public-api",
  definition: "the name the library puts in the game's global table",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Loading the library a second time is an error.",
    },
  ],
} as const satisfies Module
