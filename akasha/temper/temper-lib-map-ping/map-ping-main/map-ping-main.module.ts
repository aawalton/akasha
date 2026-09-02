import type { Module } from "@akasha/code-system/module"

export const mapPingMain = {
  id: "01a0605f-6264-74cf-907a-7a6a66cbae34",
  pageTypeSlug: "module",
  slug: "map-ping-main",
  definition: "the wiring the map ping library does as the game loads it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The global name is put in place before the handler is made.",
    },
  ],
} as const satisfies Module
