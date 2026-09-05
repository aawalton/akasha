import type { Module } from "../../code-system/modules/module.page-type.ts"

export const pageTreePanel = {
  id: "01a06867-dbcb-79af-8a3f-3679e67742a9",
  pageTypeSlug: "module",
  slug: "page-tree-panel",
  definition: "the Pages panel brought up, and the pages drawn into it from one file",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The pages are read from the file the service writes rather than assembled.",
    },
    {
      invariantKind: "departure",
      statement:
        "The panel draws the pages that file holds before any change to that file arrives.",
    },
    {
      invariantKind: "departure",
      statement: "The panel draws again when that file is written and at no other time.",
    },

    {
      invariantKind: "departure",
      statement: "A file written while the panel is hidden is kept rather than drawn.",
    },
    {
      invariantKind: "departure",
      statement: "A panel becoming visible with a drawing owed draws the pages the file last said.",
    },
    {
      invariantKind: "departure",
      statement: "The rows the file carries are drawn as they are rather than spelled again.",
    },
    {
      invariantKind: "departure",
      statement:
        "The rows counted are all the rows, and the pages counted are the ones opening a document.",
    },
    {
      invariantKind: "departure",
      statement: "The badge counts rows while the description counts the rows a filter matched.",
    },
    {
      invariantKind: "departure",
      statement: "A page type no root reaches is said to Alan once and named on the channel.",
    },

    {
      invariantKind: "absence",
      statement: "No watcher on a source file is registered here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here assembles the tree.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides a row's appearance.",
    },
  ],
} as const satisfies Module
