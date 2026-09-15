import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const domainTreePanel = {
  id: "01a06867-dbcb-7dfc-899e-b45619e04890",
  type: "module",
  slug: "domain-tree-panel",
  definition: "the Domains panel brought up, and the domains drawn into it from one file",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The domains are read from the file the service writes rather than composed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The panel draws the rows that file has before any change to the file arrives.",
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
      statement: "A panel becoming visible with a drawing owed draws the rows the file last had.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rows the file has are drawn unchanged rather than spelled again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row's champion is carried on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The panel makes that champion the row's description.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A domain no root reaches is said to Alan once and named on the channel.",
    },

    {
      invariantKind: "invariant-kind/absence",
      statement: "No watcher on a source file is registered here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here composes the tree.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here decides the look of a row.",
    },
  ],
} as const satisfies Module
