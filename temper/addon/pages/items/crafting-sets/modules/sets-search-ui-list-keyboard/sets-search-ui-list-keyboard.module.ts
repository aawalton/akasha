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
    {
      decisionKind: "decision-kind/departure",
      statement: "Each icon column is wide enough to show its header on one line.",
    },
  ],
  createdAt: "2026-09-02T13:10:46.944Z",
  updatedAt: "2026-10-18T19:42:21.229Z",
} as const satisfies Module
