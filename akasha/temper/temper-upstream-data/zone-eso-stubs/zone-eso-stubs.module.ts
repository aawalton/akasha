import type { Module } from "@akasha/code-system/module"

export const zoneEsoStubs = {
  id: "01a06038-2cc0-7af6-bdb5-7b41393a4ae3",
  pageTypeSlug: "module",
  slug: "zone-eso-stubs",
  definition: "the ESO functions LibZone's data file calls while it loads outside the game",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A stub answers whatever lets the data file finish loading.",
    },
    {
      invariantKind: "departure",
      statement: "What a stub answers is never read as game data.",
    },
  ],
} as const satisfies Module
