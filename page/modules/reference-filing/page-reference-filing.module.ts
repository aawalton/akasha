import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageReferenceFiling = {
  id: "01a0a2fd-3d84-72e6-bf95-847df5aa7228",
  type: "module",
  slug: "page-reference-filing",
  definition: "the lines a page's own body files into the file beside every page it references",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A line is filed into the file beside the page referenced.",
    },
    {
      invariantKind: "departure",
      statement: "A name reaching a page files a line carrying the naming page's own id.",
    },
    {
      invariantKind: "departure",
      statement: "An import files a line carrying the name of the file imported.",
    },
    {
      invariantKind: "departure",
      statement:
        "The page an imported file belongs to is asked of the index, as the reader beside it asks.",
    },
    {
      invariantKind: "departure",
      statement: "A page naming the same page twice through one property files one line.",
    },
    {
      invariantKind: "departure",
      statement: "A name reaching no page is reported rather than filed.",
    },
    {
      invariantKind: "departure",
      statement: "A name a mortal page carries, or a name of a mortal page, is not reported.",
    },
    {
      invariantKind: "departure",
      statement: "A page's own identity files no line.",
    },
    {
      invariantKind: "absence",
      statement: "Only a body named `.ts` or `.tsx` files an import.",
    },
    {
      invariantKind: "gap",
      statement: "An imported file belonging to no page files no line and is not reported.",
    },
  ],
} as const satisfies Module
