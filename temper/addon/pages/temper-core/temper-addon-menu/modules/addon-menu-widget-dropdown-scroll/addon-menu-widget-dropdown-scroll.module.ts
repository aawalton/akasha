import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonMenuWidgetDropdownScroll = {
  id: "01a06100-0000-7000-8000-000000000020",
  type: "page-type/module",
  slug: "addon-menu-widget-dropdown-scroll",
  definition: "the height of a dropdown list computed from its visible row count",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Ten visible rows is the default when scrollable is true without a number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A list shorter than the visible row count is sized to its own length.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A rounding margin of one hundredth is added to the computed height.",
    },
  ],
  createdAt: "2026-09-02T07:23:05.088Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module
