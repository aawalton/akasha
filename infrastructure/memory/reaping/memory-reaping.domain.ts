import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const memoryReaping = {
  id: "01a0886f-b428-7780-8b2e-1e374e2ff056",
  type: "page-type/domain",
  slug: "memory-reaping",
  definition: "a process ended for the memory it takes or the memory its host has left",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The reaper sits outside the fleet that reaper polices.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every process running as uid 1000 is weighed, and a supervisor roots a tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tree over its ceiling is taken whether or not the host is short of memory.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tree the headroom leg takes is the single largest by subtree total.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The headroom leg takes one tree at a time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A headroom kill is followed by a window that holds only while the memory recovers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reaper takes only what every limit above that reaper let through.",
    },
  ],
  parts: [
    "module/memory-reaper-config",
    "module/memory-reaper-global",
    "module/memory-reaper-kill",
    "module/memory-reaper-legs",
    "module/memory-reaper-owner",
    "module/memory-reaper-plan",
    "module/memory-reaper-proc-scan",
    "module/memory-reaper-read",
    "module/memory-reaper-running",
    "module/memory-reaper-tick",
  ],
} as const satisfies Domain
