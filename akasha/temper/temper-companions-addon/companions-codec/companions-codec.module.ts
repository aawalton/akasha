import type { Module } from "@akasha/code-system/module"

export const companionsCodec = {
  id: "01a0611d-84d0-7a02-930a-0f62bfef9dcc",
  pageTypeSlug: "module",
  slug: "companions-codec",
  definition: "reading a companion's gear and skills off the game and writing them out as a hash",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An empty slot is written as index zero rather than left out.",
    },
  ],
} as const satisfies Module
