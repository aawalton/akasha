import type { Module } from "@akasha/code-system/module"

export const memoryReaperGlobal = {
  id: "01a0686c-f06b-7002-9ec8-2c68f87e02a6",
  pageTypeSlug: "module",
  slug: "memory-reaper-global",
  definition: "what the host gives up when its own memory headroom is gone",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The headroom leg trips only where swap is drained as well as memory.",
    },
    {
      invariantKind: "departure",
      statement: "A host with no swap at all counts as one whose swap is drained.",
    },
    {
      invariantKind: "departure",
      statement: "The largest supervisor tree goes before any single process is taken.",
    },
    {
      invariantKind: "departure",
      statement: "The largest single process is taken only where no tree holds anything.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing else is killed until the recovery window after a kill has elapsed.",
    },
    {
      invariantKind: "departure",
      statement: "The window resets the moment the leg reads clear rather than when it expires.",
    },
  ],
} as const satisfies Module
