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
      statement: "A refusal is a failure.",
    },
    {
      invariantKind: "departure",
      statement: "A failure with no fail line to name still names a finding.",
    },
    {
      invariantKind: "departure",
      statement: "A failure that was seen exits with status `1`.",
    },
    {
      invariantKind: "departure",
      statement: "A log that cannot be read exits with status `2`.",
    },
    {
      invariantKind: "departure",
      statement: "Loki rows are put back in timestamp order before the rows are weighed.",
    },
    {
      invariantKind: "departure",
      statement: "Input that is not Loki rows is weighed as the plain lines it is.",
    },
    {
      invariantKind: "departure",
      statement: "The triage's answer is stated in the verdict shape the rest of akasha reads.",
    },
  ],
} as const satisfies Module
