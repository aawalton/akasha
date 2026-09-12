import type { Command } from "akasha/commands/command.page-type.types.ts"

export const mobileCutRecord = {
  id: "01a0685d-ceae-7002-b932-ab750606b438",
  type: "command",
  slug: "mobile-cut-record",
  definition: "the command filing what a TestFlight build already at Apple was cut from",
  code: "ts",
  taking: [],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A build already carrying a fingerprint is answered rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A build number is a whole number no lower than 1.",
    },
    {
      invariantKind: "departure",
      statement: "A moment that is no instant is refused rather than read as now.",
    },
    {
      invariantKind: "departure",
      statement: "A build the newest fingerprint already names is filed again by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A shell commit and a build-input hash are each absent rather than empty.",
    },
    {
      invariantKind: "departure",
      statement: "A page written without a commit taking it counts as nothing filed.",
    },
    {
      invariantKind: "departure",
      statement:
        "A filing that threw after its commit names that commit and that page in its refusal.",
    },
    {
      invariantKind: "absence",
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
