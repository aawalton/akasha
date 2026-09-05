import type { Module } from "../../code-system/modules/module.page-type.ts"

export const domainTreePanel = {
  id: "01a06867-dbcb-7dfc-899e-b45619e04890",
  pageTypeSlug: "module",
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
      statement: "The panel draws what that file holds before any change to it arrives.",
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
      statement: "A panel becoming visible with a drawing owed draws what the file last said.",
    },
    {
      invariantKind: "departure",
      statement: "A row is spelled for the panel from the row the file carries.",
    },
    {
      invariantKind: "departure",
      statement: "A row's document is carried against the repository the panel was given.",
    },
    {
      invariantKind: "departure",
      statement: "A row's champion is carried on, the panel making it the row's description.",
    },
    {
      invariantKind: "departure",
      statement: "A domain no root reaches is said to Alan once and named on the channel.",
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
      statement: "Nothing here composes the tree.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides what a row looks like.",
    },
  ],
} as const satisfies Module
