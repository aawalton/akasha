import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const topicTree = {
  id: "01a06862-5a9a-7710-b320-dda3a41abf31",
  pageTypeSlug: "module",
  slug: "topic-tree",
  definition:
    "the topic pages read into the tree they name, each with its depth, coverage and status",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The tree is read from the pages rather than from folders on disk.",
    },
    {
      invariantKind: "departure",
      statement: "A topic naming no topic above it is the root.",
    },
    {
      invariantKind: "departure",
      statement: "Topics without one root between them are refused rather than read as empty.",
    },
    {
      invariantKind: "departure",
      statement: "The topics under one topic are read in the order their folders sort.",
    },
    {
      invariantKind: "departure",
      statement: "A topic already open above itself is left out rather than followed again.",
    },
    {
      invariantKind: "departure",
      statement: "A node is named by its slug rather than by where its file sits.",
    },
    {
      invariantKind: "departure",
      statement: "A topic naming several topics above it hangs under the first it names.",
    },
  ],
} as const satisfies Module
