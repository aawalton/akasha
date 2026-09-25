import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersPlaceholderPanel = {
  id: "01a062ee-f005-7067-a2e3-051e87a6719f",
  type: "page-type/module",
  slug: "characters-placeholder-panel",
  definition: "a panel with nothing in it yet, filling its own control",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The panel shows window-data-state's empty state, saying nothing is shown yet.",
    },
  ],
} as const satisfies Module
