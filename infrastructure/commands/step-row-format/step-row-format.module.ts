import type { Module } from "@akasha/code-system/module"

export const stepRowFormat = {
  id: "01a0686c-e937-7001-b0fc-f373fe26a0f1",
  pageTypeSlug: "module",
  slug: "step-row-format",
  definition: "one step of a pipeline written as a row a reader can scan",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A duration is stated only where both ends of the step are known and readable.",
    },
    {
      invariantKind: "departure",
      statement: "An age under a minute is stated in seconds and above it in minutes and hours.",
    },
    {
      invariantKind: "departure",
      statement:
        "One reason is written, taken in turn from the failure, the skip, the rejection and the blocker.",
    },
    {
      invariantKind: "departure",
      statement: "A reason is written on one line, whatever it held.",
    },
    {
      invariantKind: "departure",
      statement:
        "A wait is aged against the step's own end where it has one, and against now where it has not.",
    },
  ],
} as const satisfies Module
