import type { Module } from "../../code-system/modules/module.page-type.ts"

export const pageTreePanel = {
  id: "01a06867-dbcb-79af-8a3f-3679e67742a9",
  pageTypeSlug: "module",
  slug: "page-tree-panel",
  definition: "the Pages panel brought up, and when the pages are read again for it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The panel is read once as it starts, before any write asks for a read.",
    },
    {
      invariantKind: "departure",
      statement: "The corpus watched is the one the tree is drawn from rather than the checkout.",
    },
    {
      invariantKind: "departure",
      statement: "A write asks for a read once the corpus has held still for the quiet.",
    },
    {
      invariantKind: "departure",
      statement:
        "The rows counted are all of them, and the pages counted are those opening a document.",
    },
    {
      invariantKind: "departure",
      statement: "The badge counts rows while the description counts what a filter matched.",
    },
    {
      invariantKind: "departure",
      statement:
        "A read that fails says why in the view rather than leaving the rows drawn as true.",
    },
    {
      invariantKind: "departure",
      statement: "A page type no root reaches is said to Alan once and named on the channel.",
    },
    {
      invariantKind: "departure",
      statement: "Every read's outcome is recorded as an observation under the panel's name.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here assembles the tree.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides what a row looks like.",
    },
  ],
} as const satisfies Module
