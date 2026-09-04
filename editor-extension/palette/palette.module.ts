import type { Module } from "../../code-system/modules/module.page-type.ts"

export const palette = {
  id: "01a064d3-f9f9-7259-a38b-0eb2aede39cb",
  pageTypeSlug: "module",
  slug: "palette",
  definition: "the color names the editor admits and the hex triplet each name answers with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A color here is a semantic color the design tokens hold.",
    },
    {
      invariantKind: "departure",
      statement: "A color is answered as a hex triplet.",
    },
    {
      invariantKind: "departure",
      statement: "A name is lowercased before being matched.",
    },
    {
      invariantKind: "departure",
      statement: "A name matching no color is answered as nothing rather than as a fallback.",
    },
    {
      invariantKind: "departure",
      statement: "A channel outside the range is pulled to the nearest end before being written.",
    },
    {
      invariantKind: "departure",
      statement: "The names are answered as a set of their own.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says which terminal or row takes which color.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a color the editor's own theme names.",
    },
  ],
} as const satisfies Module
