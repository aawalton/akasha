import type { Module } from "../../code-system/modules/module.page-type.ts"

export const commandTreePanel = {
  id: "01a07c93-a783-7aeb-b52e-9302045260e3",
  pageTypeSlug: "module",
  type: "module",
  slug: "command-tree-panel",
  definition: "the Commands panel brought up, and the commands drawn into it from one file",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The commands are read from the file the service writes rather than assembled.",
    },
    {
      invariantKind: "departure",
      statement:
        "The panel draws the commands that file has before any change to that file arrives.",
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
      statement:
        "A panel becoming visible with a drawing owed draws the commands the file last said.",
    },
    {
      invariantKind: "departure",
      statement: "The rows the file has are drawn unchanged rather than spelled again.",
    },
    {
      invariantKind: "departure",
      statement: "The rows counted are all the rows.",
    },
    {
      invariantKind: "departure",
      statement: "The commands counted are the rows a caller can run.",
    },
    {
      invariantKind: "departure",
      statement: "The badge counts rows while the description counts commands.",
    },
    {
      invariantKind: "departure",
      statement: "The description counts the rows a filter matched while that filter is there.",
    },
    {
      invariantKind: "departure",
      statement: "A command no namespace reaches is said to Alan once and named on the channel.",
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
