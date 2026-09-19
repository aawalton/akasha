import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const memoryGuard = {
  id: "01a05c67-00ad-77fa-b6c0-e677644ff621",
  type: "page-type/module",
  slug: "memory-guard",
  definition: "whether the workstation has memory enough to admit one more process",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Sixteen gigabytes free is the least the workstation admits a process on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A least read from the environment is used only where that least parses to a positive number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Admitting a spawn asks the inodes as well as the memory.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A meminfo line that does not match refuses rather than reading as zero.",
    },
  ],
} as const satisfies Module
