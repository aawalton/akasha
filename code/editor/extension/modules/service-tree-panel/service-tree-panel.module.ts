import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const serviceTreePanel = {
  id: "01a09c1f-c969-70a4-a5e8-5a77d1afbb11",
  type: "module",
  slug: "service-tree-panel",
  definition: "the Services panel brought up, and the services put into it from one file",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The services are read from the file the service writes rather than assembled.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The panel shows the services that file has before any change to that file arrives.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The panel shows them again when that file is written and at no other time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file written while the panel is hidden is kept rather than shown.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A panel becoming visible with a showing owed shows the services the file last said.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rows the file has are shown unchanged rather than spelled again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rows counted are all the rows.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The services counted are the rows that are one service rather than a kind.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The kinds counted are the rows that are a kind rather than the top row.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The badge counts rows while the description counts services.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The description counts the rows a filter matched while that filter is there.",
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
