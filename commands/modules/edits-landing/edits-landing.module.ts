import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const editsLanding = {
  id: "01a08132-ea7c-7ba6-972a-e1a6c95b5b76",
  type: "module",
  slug: "edits-landing",
  definition: "the bodies a landing takes, worked out from the answer a change gave",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A body is worked out by replaying the answer rather than read off the answer.",
    },
    {
      invariantKind: "departure",
      statement: "The answer is replayed onto the commit at HEAD rather than onto the tree.",
    },
    {
      invariantKind: "departure",
      statement: "A path that commit holds nothing at is read off the tree.",
    },
    {
      invariantKind: "departure",
      statement: "An add is refused there.",
    },
    {
      invariantKind: "departure",
      statement: "An edit that will not replay refuses.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing is merged onto anything.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names each path a rename moved after the change was drafted.",
    },
    {
      invariantKind: "departure",
      statement: "A path renamed twice is named by the path the last rename left that body at.",
    },
    {
      invariantKind: "departure",
      statement: "A body is formatted before that body is handed on.",
    },
    {
      invariantKind: "departure",
      statement: "Every body a landing takes is formatted in one run rather than one at a time.",
    },
    {
      invariantKind: "departure",
      statement: "Which paths the formatter has already left are handed on beside the rows.",
    },
    {
      invariantKind: "departure",
      statement: "A path the answer carries away is handed on as no body.",
    },
    {
      invariantKind: "departure",
      statement: "A move no other edit names is handed on as a path moved rather than as a body.",
    },
    {
      invariantKind: "departure",
      statement: "A bring no other edit names is handed on as that bring rather than as a body.",
    },
    {
      invariantKind: "departure",
      statement: "The path a bring names is read for no body and formatted by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Neither path of a move is read for a body or handed on as one.",
    },
    {
      invariantKind: "departure",
      statement: "A path an edit names carries whether its readers owe the reading again.",
    },
    {
      invariantKind: "departure",
      statement: "A move has that owing at both the path it left and the path it reached.",
    },
    {
      invariantKind: "departure",
      statement: "An edit saying nothing of its readers has no owing for that path.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes the tree.",
    },
  ],
} as const satisfies Module
