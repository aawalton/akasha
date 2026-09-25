import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsSearchUiListKeyboard = {
  id: "01a0623e-53a0-7e39-b6fd-9b8f3654ae21",
  type: "page-type/module",
  slug: "sets-search-ui-list-keyboard",
  definition: "how the result list's rows and headers are laid out in keyboard mode",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A search leaving no set says so through window-data-state rather than the game's empty row.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The sets are tables the add-on carries, so the list never loads or fails.",
    },
  ],
} as const satisfies Module
