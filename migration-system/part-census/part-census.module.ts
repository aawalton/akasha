import type { Module } from "@akasha/code-system/module"

export const partCensus = {
  id: "01a06980-1555-7648-8777-3035d5b2736d",
  pageTypeSlug: "module",
  slug: "part-census",
  definition: "which pages under the akasha domain no page above them names among its parts",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every page whose page type descends from `domain` is judged.",
    },
    {
      invariantKind: "departure",
      statement: "The page `domain/akasha` is left out of the judging.",
    },
    {
      invariantKind: "departure",
      statement: "A page is judged on whether any page names its id among the `part-slugs`.",
    },
    {
      invariantKind: "departure",
      statement: "That predicate is the one `domain-is-named-by-a-parent` reads.",
    },
    {
      invariantKind: "departure",
      statement: "The whole tree is judged rather than the pages one change carries.",
    },
    {
      invariantKind: "departure",
      statement: "The index is read once and every page is judged against that reading.",
    },
    {
      invariantKind: "departure",
      statement: "How many pages each page type gave the census is answered beside the census.",
    },
    {
      invariantKind: "constraint",
      statement: "A reading taken across a landing reports pages that landing has already named.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says which page above an unnamed page ought to name that page.",
    },
  ],
} as const satisfies Module
