import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuDropdownHeader = {
  id: "01a06275-c448-77b6-b7de-356d17d15a95",
  type: "page-type/module",
  slug: "scrollable-menu-dropdown-header",
  definition: "the numbered header child controls and the anchor sets each one takes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Header children are addressed by integer id rather than by control name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Anchors are declared once as objects and reapplied on every refresh.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A divider row is inserted between header children by an id comparison.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A header with a filter box is widened to the search-header minimum.",
    },
  ],
} as const satisfies Module
