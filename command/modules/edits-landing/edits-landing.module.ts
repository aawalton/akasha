import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const editsLanding = {
  id: "01a08132-ea7c-7ba6-972a-e1a6c95b5b76",
  type: "page-type/module",
  slug: "edits-landing",
  definition: "the bodies a landing takes, worked out from the answer a change gave",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A body is worked out by replaying the answer rather than read off the answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer is replayed onto the commit at HEAD rather than onto the tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path that commit holds nothing at is read off the tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An add is refused there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An edit that will not replay refuses.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing is merged onto anything.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal names each path a rename moved after the change was drafted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path renamed twice is named by the path the last rename left that body at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body is formatted before that body is handed on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every body a landing takes is formatted in one run rather than one at a time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which paths the formatter has already left are handed on beside the rows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path the answer carries away is handed on as no body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A move no other edit names is handed on as a path moved rather than as a body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bring no other edit names is handed on as that bring rather than as a body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The path a bring names is read for no body and formatted by nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bring from a path outside that holds no file is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Neither path of a move is read for a body or handed on as one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path an edit names carries whether its readers owe the reading again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A move has that owing at both the path it left and the path it reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An edit saying nothing of its readers has no owing for that path.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes the tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which of those bodies the formatter changed are handed on beside them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The body the writer's own edits leave at a path is handed on beside the formatted one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A path an edit owing its writer no reading names has no body of the writer's own.",
    },
  ],
} as const satisfies Module
