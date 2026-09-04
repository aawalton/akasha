import type { Module } from "@akasha/code-system/module"

export const checkCost = {
  id: "01a06dc1-5cd3-7e3e-b1c7-133ae3f5ec38",
  pageTypeSlug: "module",
  slug: "check-cost",
  definition: "what one run of one check cost, appended beside that check's page",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A cost is taken around one check rather than around a whole change.",
    },
    {
      invariantKind: "departure",
      statement: "A run is timed by the processor rather than by the clock alone.",
    },
    {
      invariantKind: "departure",
      statement: "The seconds a reaped child burned are read from `/proc/self/stat`.",
    },
    {
      invariantKind: "departure",
      statement: "The memory a run added is the rise in the high-water mark at `VmHWM`.",
    },
    {
      invariantKind: "departure",
      statement: "A line is appended to the last numbered file rather than rewriting it.",
    },
    {
      invariantKind: "departure",
      statement: "A line rolls into the next numbered file where the ceiling is reached.",
    },
    {
      invariantKind: "departure",
      statement: "A file's fill is read from its size rather than from its text.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here refuses a check for what that check cost.",
    },
    {
      invariantKind: "absence",
      statement: "A disk that refuses a line leaves the check's answer alone.",
    },
    {
      invariantKind: "gap",
      statement: "The peak memory a reaped child reached is read nowhere here.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing here holds a lock against another writer of the same file.",
    },
  ],
} as const satisfies Module
