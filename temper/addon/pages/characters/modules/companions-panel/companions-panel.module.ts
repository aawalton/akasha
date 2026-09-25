import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionsPanel = {
  id: "01a0611d-84de-7c65-8411-3dd9d941484a",
  type: "page-type/module",
  slug: "companions-panel",
  definition: "the panel showing a companion's key and value rows",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Live rows are hidden while no companion is summoned.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "With no companion chosen, or none captured, the panel says so through window-data-state.",
    },
  ],
} as const satisfies Module
