import type { Module } from "@akasha/code-system/module"

export const companionsGlobals = {
  id: "01a0611d-84dc-7ccb-8d6e-224471379bbc",
  pageTypeSlug: "module",
  slug: "companions-globals",
  definition: "the two names the add-on hangs off the game's global table",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only refreshing and clearing are reachable from outside.",
    },
  ],
} as const satisfies Module
