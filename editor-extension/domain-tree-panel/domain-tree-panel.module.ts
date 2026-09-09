import type { Module } from "../../code-system/modules/module.page-type.ts"

export const domainTreePanel = {
  id: "01a06867-dbcb-7dfc-899e-b45619e04890",
  pageTypeSlug: "module",
  type: "module",
  slug: "domain-tree-panel",
  definition: "the Domains panel brought up, and the domains drawn into it from one file",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The domains are read from the file the service writes rather than composed.",
    },
    {
      invariantKind: "departure",
      statement: "The panel draws the rows that file has before any change to the file arrives.",
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
      statement: "A panel becoming visible with a drawing owed draws the rows the file last had.",
    },
    {
      invariantKind: "departure",
      statement: "The rows the file has are drawn unchanged rather than spelled again.",
    },
    {
      invariantKind: "departure",
      statement: "A row's champion is carried on.",
    },
    {
      invariantKind: "departure",
      statement: "The panel makes that champion the row's description.",
    },
    {
      invariantKind: "departure",
      statement: "A domain no root reaches is said to Alan once and named on the channel.",
    },

    {
      invariantKind: "absence",
      statement: "No watcher on a source file is registered here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here composes the tree.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides the look of a row.",
    },
  ],
} as const satisfies Module
