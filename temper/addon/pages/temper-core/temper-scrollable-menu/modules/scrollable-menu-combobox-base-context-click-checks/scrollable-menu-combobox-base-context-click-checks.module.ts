import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuComboboxBaseContextClickChecks = {
  id: "01a06275-c444-7eab-9372-905584db3ff8",
  type: "page-type/module",
  slug: "scrollable-menu-combobox-base-context-click-checks",
  definition: "the two suppression checks around a click that lands outside the context menu",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The two checks are published on the library object rather than on a class.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A context menu click sets a preventer variable instead of returning a decision.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A checkbox or radio entry sets the suppression counter to two clicks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Clicking away from the context menu clears the menu before the click is handled.",
    },
  ],
  createdAt: "2026-09-02T14:11:20.260Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module
