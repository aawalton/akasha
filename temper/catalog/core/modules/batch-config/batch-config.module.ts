import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const batchConfig = {
  id: "01a06071-0c77-7e96-8044-2bad3e05b280",
  type: "page-type/module",
  slug: "batch-config",
  definition: "how many entries a collector reads at once, and how long it waits after each batch",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A batch reads a hundred entries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The next batch begins a hundred milliseconds later.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the game.",
    },
  ],
  createdAt: "2026-09-02T04:46:56.631Z",
  updatedAt: "2026-09-21T15:11:26.000Z",
} as const satisfies Module
