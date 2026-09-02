import type { Module } from "@akasha/code-system/module"

export const mediaGlobal = {
  id: "01a06069-f8c4-7dae-850f-fe59ef282b81",
  pageTypeSlug: "module",
  slug: "media-global",
  definition: "the one global name the game and other addons reach the library by",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Loading twice warns in chat rather than replacing the library.",
    },
  ],
} as const satisfies Module
