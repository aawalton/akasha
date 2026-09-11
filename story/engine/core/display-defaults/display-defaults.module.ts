import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const displayDefaults = {
  id: "01a05b71-e543-7b2a-a5d5-2d33b290b697",
  type: "module",
  slug: "display-defaults",
  definition: "the chapter-prose dials a game falls back to where it declares none of its own",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Chapter titles are shown where a game says nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Past turns are drawn plain where a game says nothing.",
    },
  ],
} as const satisfies Module
