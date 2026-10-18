import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const selectorUiLayout = {
  id: "01a061ef-c8a5-7904-8bda-1ac5e267ab43",
  type: "page-type/module",
  slug: "selector-ui-layout",
  definition: "the controls the add-on puts on the game's add-ons screen",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The pack rows sit below the game's character dropdown, and its list below them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game's list is shortened by as much as it moved, so its buttons stay put.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each text field is the game's edit field inside the game's edit backdrop.",
    },
  ],
  createdAt: "2026-09-02T11:44:59.557Z",
  updatedAt: "2026-10-18T20:28:30.899Z",
} as const satisfies Module
