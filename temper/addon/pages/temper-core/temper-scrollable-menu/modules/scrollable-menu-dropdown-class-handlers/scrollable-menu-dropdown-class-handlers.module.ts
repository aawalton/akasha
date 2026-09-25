import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuDropdownClassHandlers = {
  id: "01a06275-c448-784f-b2c1-a28462d70542",
  type: "page-type/module",
  slug: "scrollable-menu-dropdown-class-handlers",
  definition: "the mouse-up, selection and show-hide methods of the dropdown object",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Right-clicking a row runs the entry's context-menu callback instead of selecting that entry.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Three preventer variables are cleared at the top of every mouse-up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A submenu inherits multi-select from its parent menu on the first click.",
    },
  ],
} as const satisfies Module
