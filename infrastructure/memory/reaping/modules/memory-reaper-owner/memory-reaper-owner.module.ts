import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const memoryReaperOwner = {
  id: "01a0686c-f06b-7003-8046-1fd5f5849520",
  type: "module",
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
  ],
} as const satisfies Module
