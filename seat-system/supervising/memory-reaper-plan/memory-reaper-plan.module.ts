import type { Module } from "@akasha/code-system/module"

export const memoryReaperPlan = {
  id: "01a0686c-f06b-7004-8e58-5c2972baf99d",
  pageTypeSlug: "module",
  slug: "memory-reaper-plan",
  definition: "the whole set of kills one tick would signal, and what each of them is refused for",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A plan is settled whole before any process is signalled.",
    },
    {
      invariantKind: "departure",
      statement: "The reaper never plans a kill that would take the reaper itself.",
    },
    {
      invariantKind: "departure",
      statement: "A tree holding more than one seat is refused, the ceiling answering one seat.",
    },
    {
      invariantKind: "departure",
      statement: "A process inside a tree already planned is covered by that tree's kill.",
    },
    {
      invariantKind: "departure",
      statement: "A tree planned twice is signalled once.",
    },
    {
      invariantKind: "departure",
      statement:
        "A tree under its ceiling once its own over-ceiling processes go is spared and says so.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal is carried in the plan rather than dropped out of it.",
    },
  ],
} as const satisfies Module
