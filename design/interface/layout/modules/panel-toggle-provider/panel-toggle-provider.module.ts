import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const panelToggleProvider = {
  id: "01a05b82-8b99-71ea-8418-c319e661ecd8",
  type: "page-type/module",
  slug: "panel-toggle-provider",
  definition: "the keystroke opening and closing every panel at once",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An app binds this keystroke once by mounting this provider at its root rather than page by page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A provider mounted inside another binds the keystroke again, and both answer one press.",
    },
  ],
} as const satisfies Module
