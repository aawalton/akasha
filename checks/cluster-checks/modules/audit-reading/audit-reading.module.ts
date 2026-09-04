import type { Module } from "@akasha/code-system/module"

export const auditReading = {
  id: "01a06875-ed3a-7000-ba9e-391ea2f95c40",
  pageTypeSlug: "module",
  slug: "audit-reading",
  definition: "what an audit measured, and the lines saying so where a zero is not a result",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An audit that scanned nothing is no population rather than a finding of none.",
    },
    {
      invariantKind: "departure",
      statement: "A count reached without weighing anything says it is not a zero.",
    },
    {
      invariantKind: "departure",
      statement: "A zero from a comparison that ran reads differently from a zero that did not.",
    },
    {
      invariantKind: "departure",
      statement: "A count from a truncated scan is stated as a floor rather than as a census.",
    },
  ],
} as const satisfies Module
