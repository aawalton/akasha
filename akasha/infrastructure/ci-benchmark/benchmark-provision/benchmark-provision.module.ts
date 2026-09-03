import type { Module } from "@akasha/code-system/module"

export const benchmarkProvision = {
  id: "01a0680f-d1b7-71d7-878e-57491a50884e",
  pageTypeSlug: "module",
  slug: "benchmark-provision",
  definition: "the shell staging a benchmark node's toolchain",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The toolchain is staged before any timed phase starts.",
    },
    {
      invariantKind: "departure",
      statement: "A toolchain missing a binary aborts the run rather than failing a step.",
    },
  ],
} as const satisfies Module
