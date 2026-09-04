import type { Module } from "@akasha/code-system/module"

export const memoryReaperOwner = {
  id: "01a0686c-f06b-7003-8046-1fd5f5849520",
  pageTypeSlug: "module",
  slug: "memory-reaper-owner",
  definition: "which seat a process about to be killed belongs to",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat is read off a command line rather than looked up anywhere.",
    },
    {
      invariantKind: "departure",
      statement: "An agent id that is no uuid names no seat.",
    },
    {
      invariantKind: "departure",
      statement: "The nearest ancestor naming a seat is the one the process belongs to.",
    },
    {
      invariantKind: "departure",
      statement: "A walk up the process tree stops at a hop ceiling and at a pid seen twice.",
    },
  ],
} as const satisfies Module
