import type { Module } from "@akasha/code-system/module"

export const partCensus = {
  id: "01a06980-1555-7648-8777-3035d5b2736d",
  pageTypeSlug: "module",
  slug: "part-census",
  definition: "which pages under the akasha domain no page names among its parts, and which two do",
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
      statement: "A page is judged on how many pages name its id among the `part-slugs`.",
    },
    {
      invariantKind: "departure",
      statement: "Exactly one page naming a page is the parts of every page being a spanning tree.",
    },
    {
      invariantKind: "departure",
      statement: "A page no page names is answered apart from a page more than one page names.",
    },
    {
      invariantKind: "departure",
      statement: "Which pages name a page more than one page names is answered beside that page.",
    },
    {
      invariantKind: "departure",
      statement: "A page no page names is the fault `domain-is-named-by-a-parent` reads.",
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
    {
      invariantKind: "absence",
      statement:
        "Nothing here says which of the pages naming a page ought to go on naming that page.",
    },
  ],
} as const satisfies Module
