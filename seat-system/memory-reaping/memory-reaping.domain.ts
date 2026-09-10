import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const memoryReaping = {
  id: "01a0886f-b428-7780-8b2e-1e374e2ff056",
  pageTypeSlug: "domain",
  slug: "memory-reaping",
  definition: "a process ended for the memory its host has run out of",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reaper sits outside the fleet that reaper polices.",
    },
    {
      invariantKind: "departure",
      statement: "Every agent supervisor tree running as uid 1000 is watched.",
    },
    {
      invariantKind: "departure",
      statement: "A tree is killed only under host memory pressure.",
    },
    {
      invariantKind: "departure",
      statement: "The tree killed is the single largest by subtree total.",
    },
    {
      invariantKind: "departure",
      statement: "One tree goes per kill.",
    },
    {
      invariantKind: "departure",
      statement: "A kill is followed by a recovery window in which nothing else is killed.",
    },
  ],
  parts: [
    "module/memory-reaper-running",
    "module/memory-reaper-config",
    "module/memory-reaper-global",
    "module/memory-reaper-kill",
    "module/memory-reaper-legs",
    "module/memory-reaper-owner",
    "module/memory-reaper-plan",
    "module/memory-reaper-proc-scan",
    "module/memory-reaper-read",
    "module/memory-reaper-tick",
  ],
} as const satisfies Domain
