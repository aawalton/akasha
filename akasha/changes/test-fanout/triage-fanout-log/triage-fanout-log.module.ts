import type { Module } from "@akasha/code-system/module"

export const triageFanoutLog = {
  id: "01a06885-0bab-7004-ac15-52f15a9cdbfb",
  pageTypeSlug: "module",
  slug: "triage-fanout-log",
  definition:
    "the verdict a consolidated fan-out log carries, and the failures charged back from it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A log that proves no complete run fails rather than passing on silence.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal is a failure, because a run that executed no test proves nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A failure with no fail line to name still names a finding rather than none.",
    },
    {
      invariantKind: "departure",
      statement:
        "A failure that was seen exits one and a log that cannot be read exits two, so the two are told apart.",
    },
    {
      invariantKind: "departure",
      statement:
        "Loki rows are read as rows and put back in timestamp order before they are weighed.",
    },
    {
      invariantKind: "departure",
      statement: "Input that is not Loki rows is weighed as the plain lines it is.",
    },
    {
      invariantKind: "gap",
      statement: "What reads a bun run's own summary out of the log stands outside akasha.",
    },
  ],
} as const satisfies Module
