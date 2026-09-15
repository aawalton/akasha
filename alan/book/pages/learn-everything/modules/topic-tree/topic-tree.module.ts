import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const topicTree = {
  id: "01a06862-5a9a-7710-b320-dda3a41abf31",
  type: "page-type/module",
  slug: "topic-tree",
  definition: "the topic pages read into the tree they name, each with its coverage and status",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The tree is read from the pages rather than from folders on disk.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A topic naming no topic above that topic is the root.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A topic reaches the topic above whether or not it names that topic's page type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Topics without one root between those topics are refused rather than read as empty.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The topics under one topic are read in the order their folders sort.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A topic already open above itself is left out rather than followed again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A node is named by its slug rather than by where its file sits.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A topic naming several topics above that topic hangs under the first that topic names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A chevron parts each name in a label from the next.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A title is the last name in a label.",
    },
  ],
} as const satisfies Module
