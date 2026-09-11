import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const memoryReaping = {
  id: "01a0886f-b428-7780-8b2e-1e374e2ff056",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "memory-reaping",
  definition: "a process ended for the memory its host has run out of",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reaper sits outside the fleet that reaper polices.",
    },
    {
      invariantKind: "departure",
      statement: "Every process running as uid 1000 is weighed, and a supervisor roots a tree.",
    },
    {
      invariantKind: "departure",
      statement: "A tree over its ceiling is taken whether or not the host is short of memory.",
    },
    {
      invariantKind: "departure",
      statement: "The tree the headroom leg takes is the single largest by subtree total.",
    },
    {
      invariantKind: "departure",
      statement: "The headroom leg takes one tree at a time.",
    },
    {
      invariantKind: "departure",
      statement: "A headroom kill is followed by a window in which that leg takes nothing else.",
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
