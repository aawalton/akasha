import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const propertyBadge = {
  id: "01a0620f-82c5-700f-bcd7-80f904364925",
  type: "page-type/module",
  slug: "property-badge",
  definition: "the badge a property is shown as, drawn by the page type declaring it",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A property no page type above it draws takes the badge beside page-property.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A badge in a row of a property list is drawn bare unless its color names something.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A computed property's badge is never drawn to be edited.",
    },
  ],
  createdAt: "2026-09-02T12:19:38.821Z",
  updatedAt: "2026-10-28T20:18:37.705Z",
} as const satisfies Module
