import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const commandTreePanel = {
  id: "01a07c93-a783-7aeb-b52e-9302045260e3",
  type: "module",
  slug: "command-tree-panel",
  definition: "the Commands panel brought up, and the commands drawn into it from one file",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The commands are read from the file the service writes rather than assembled.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The panel draws the commands that file has before any change to that file arrives.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The panel draws again when that file is written and at no other time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file written while the panel is hidden is kept rather than drawn.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A panel becoming visible with a drawing owed draws the commands the file last said.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rows the file has are drawn unchanged rather than spelled again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rows counted are all the rows.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The commands counted are the rows a caller can run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The badge counts rows while the description counts commands.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The description counts the rows a filter matched while that filter is there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A command no namespace reaches is said to Alan once and named on the channel.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No watcher on a source file is registered here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here assembles the tree.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here decides a row's appearance.",
    },
  ],
} as const satisfies Module
