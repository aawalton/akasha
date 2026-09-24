import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const savedVarsManager = {
  id: "01a06177-abfd-73d0-abdb-d019d3e9b824",
  type: "page-type/module",
  slug: "saved-vars-manager",
  definition: "the manager class through which an addon renames and removes settings",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A saved table's path is written as its keys joined, a table not yet made included.",
    },
  ],
} as const satisfies Module
