import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const rating = {
  id: "01a06741-dd0f-7004-9b9b-26579c448c7b",
  type: "page-type/number-property",
  slug: "rating",
  propertySlug: "rating",
  definition: "the score Alan gives a book",
  max: 10,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rating is Alan's own score rather than anyone else's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A book Alan has not scored states no rating.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T12:32:44.815Z",
  updatedAt: "2026-10-30T15:07:58.414Z",
} as const satisfies NumberProperty
