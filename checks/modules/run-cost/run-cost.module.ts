import type { Module } from "@akasha/code/module"

export const runCost = {
  id: "01a06949-b281-78a7-a70c-701001269801",
  pageTypeSlug: "module",
  type: "module",
  slug: "run-cost",
  definition: "how long a check may take, and the cpu time it really took",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The bands go from fast to eternal with each band looser than the last.",
    },
    {
      invariantKind: "departure",
      statement: "The eternal band has no ceiling.",
    },
    {
      invariantKind: "departure",
      statement: "Loosening the last band gives that same band back.",
    },
    {
      invariantKind: "departure",
      statement:
        "The cpu time counted is this process together with every child this process reaped.",
    },
    {
      invariantKind: "departure",
      statement: "The stat line is read from its last bracket on.",
    },
    {
      invariantKind: "departure",
      statement: "A name with spaces is safe.",
    },
    {
      invariantKind: "departure",
      statement: "A ceiling with no end is written as no ceiling rather than a count of seconds.",
    },
  ],
} as const satisfies Module
