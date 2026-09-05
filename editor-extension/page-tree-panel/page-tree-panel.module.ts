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
      statement: "A file the service has not written leaves the rows on the screen as they are.",
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
      statement: "A row is spelled for the panel from the row the file carries.",
    },
    {
      invariantKind: "departure",
      statement: "A row's document is carried on whole, there being nothing here to join.",
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
      invariantKind: "departure",
      statement: "Every drawing's outcome is recorded as an observation under the panel's name.",
    },
    {
      invariantKind: "absence",
      statement: "No timer starts a drawing.",
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
