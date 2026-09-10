import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const subagentOutliving = {
  id: "01a08ccb-9a38-710f-a8a6-92cf91ee1cfc",
  pageTypeSlug: "module",
  type: "module",
  slug: "subagent-outliving",
  definition: "the subagents whose last record predates the start of the client hosting them",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A subagent runs inside the client that launched it.",
    },
    {
      invariantKind: "departure",
      statement: "A client spawned in place of an earlier client runs no subagent already open.",
    },
    {
      invariantKind: "departure",
      statement:
        "A subagent whose last record predates its client's start is therefore no longer running.",
    },
    {
      invariantKind: "departure",
      statement:
        "When a client started is the time the folder that client has under /proc carries.",
    },
    {
      invariantKind: "departure",
      statement: "When a subagent last acted is the time that subagent's own transcript carries.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent's transcript sits under the seat transcript's own name beside it.",
    },
    {
      invariantKind: "absence",
      statement: "No span of time is read here, only which of two moments came first.",
    },
    {
      invariantKind: "departure",
      statement: "A client whose start cannot be read leaves every subagent judged elsewhere.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent whose transcript cannot be read is left judged elsewhere.",
    },
    {
      invariantKind: "departure",
      statement: "A record written as the client started is read as the client's own.",
    },
  ],
} as const satisfies Module
