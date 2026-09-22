import type { Command } from "akasha/command/command.page-type.types.ts"

export const mobileCutRecord = {
  id: "01a0685d-ceae-7002-b932-ab750606b438",
  type: "page-type/command",
  slug: "mobile-cut-record",
  definition: "the command filing the commit of a TestFlight build already at Apple",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A build already carrying a fingerprint is answered rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build number is a whole number no lower than 1.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A moment that is no instant is refused rather than read as now.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build the newest fingerprint already names is filed again by nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shell commit and a build-input hash are each absent rather than empty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page written without a commit taking it counts as nothing filed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A filing that threw after its commit names that commit and that page in its refusal.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches Apple or the mac.",
    },
  ],
  name: "record",
  arguments: [
    { argument: "argument/app" },
    { argument: "argument/build-number", required: true },
    { argument: "argument/main-sha", required: true },
    { argument: "argument/shell-sha" },
    { argument: "argument/build-input-tree-hash" },
    { argument: "argument/cut-at" },
  ],
} as const satisfies Command
