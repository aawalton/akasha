import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const notWith = {
  id: "01a09483-7144-7d5c-a857-085af955734b",
  type: "page-type/relation-property",
  slug: "not-with",
  propertySlug: "not-with",
  definition: "an argument a call never says beside this one",
  targetPageType: "page-type/argument",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A call saying both arguments is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One entry states a pair, and the other entry needs no matching statement.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pair one command may not say together is said together under another command.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Which arguments may not be said together belongs to the command rather than to the argument.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-12T07:27:17.316Z",
  updatedAt: "2026-09-22T10:09:10.000Z",
} as const satisfies RelationProperty
