import type { Module } from "../../code-system/modules/module.page-type.ts"

export const workTreeRows = {
  id: "01a06867-dbcb-7799-8db6-bc35df7360fc",
  pageTypeSlug: "module",
  slug: "work-tree-rows",
  definition: "the shape of a work tree row, held apart from the reading that fills it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A row is keyed by the slug the initiative declares rather than by its file name.",
    },
    {
      invariantKind: "departure",
      statement: "A row standing for nothing declared carries no path and opens no document.",
    },
    {
      invariantKind: "departure",
      statement: "A row carries the color its turn state is drawn in, named rather than specified.",
    },
    {
      invariantKind: "departure",
      statement: "A row nothing states carries no color.",
    },
    {
      invariantKind: "departure",
      statement: "The colors are answered keyed the way a row is keyed.",
    },
    {
      invariantKind: "departure",
      statement:
        "The shape stands here so the parser and the coloring hold one edge between them rather than two.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads an answer.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here runs.",
    },
  ],
} as const satisfies Module
