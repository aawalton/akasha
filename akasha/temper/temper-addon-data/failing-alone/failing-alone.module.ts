import type { Module } from "@akasha/code-system/module"

export const failingAlone = {
  id: "01a0634a-8c28-756d-b32d-65b40d60fdc9",
  pageTypeSlug: "module",
  slug: "failing-alone",
  definition: "a throw held where it happened, so one failure fails alone",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A table is rendered inside the promise writing the table rather than before the promise.",
    },
    {
      invariantKind: "departure",
      statement:
        "A throw raised while a section builds its write list becomes that list's one rejection.",
    },
    {
      invariantKind: "departure",
      statement: "A failure names the file or the section the failure came from.",
    },
    {
      invariantKind: "departure",
      statement: "A run holding a failure writes every healthy file anyway.",
    },
    {
      invariantKind: "departure",
      statement: "A run holding a failure fails.",
    },
  ],
} as const satisfies Module
