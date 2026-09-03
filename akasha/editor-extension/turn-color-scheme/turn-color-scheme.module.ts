import type { Module } from "../../code-system/modules/module.page-type.ts"

export const turnColorScheme = {
  id: "01a0680b-7175-7000-bad0-dd03b18ea236",
  pageTypeSlug: "module",
  slug: "turn-color-scheme",
  definition: "the color a turn path is drawn in and the sentence a turn state reads as",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A color is named by the palette name standing in the path.",
    },
    {
      invariantKind: "departure",
      statement: "The color id is that name under one fixed prefix.",
    },
    {
      invariantKind: "departure",
      statement: "A turn and a subagent are read out of a path the same way.",
    },
    {
      invariantKind: "departure",
      statement: "A name the palette does not hold is drawn in no color.",
    },
    {
      invariantKind: "departure",
      statement: "A state of `unknown` is said as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A state with something waited on is said as the state and that thing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here holds what the colors are.",
    },
  ],
} as const satisfies Module
