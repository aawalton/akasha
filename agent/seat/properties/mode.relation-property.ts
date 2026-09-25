import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const mode = {
  id: "01a07661-4b8c-7ac8-ba3a-9cbd32e9ae55",
  type: "page-type/relation-property",
  slug: "mode",
  propertySlug: "mode",
  definition: "how an agent in a seat runs",
  targetPageType: "page-type/seat-mode",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat's mode is observed of the supervisor with the seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The mode a seat is running in is told apart from the mode that seat was started in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat no supervisor has written a mode for has no mode.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mode no seat mode page names is not written.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
