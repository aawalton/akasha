import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const housingListState = {
  id: "01a0da0f-bc9b-705d-9e99-cdf53baf4bbd",
  type: "page-type/module",
  slug: "housing-list-state",
  definition: "what a house-travel list shows once it holds no row",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A house-travel list with no row says so through window-data-state.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The state sits on the list's fixed scroll area, so it stays put as the rows move.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each list keeps one such state, made the first time the list is filled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "What a list holds is read from the game or the add-on at once, so it never loads or fails.",
    },
  ],
} as const satisfies Module
