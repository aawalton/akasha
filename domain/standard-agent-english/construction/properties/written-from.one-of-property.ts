import type { OneOfProperty } from "akasha/page/one-of-property/one-of-property.page-type.types.ts"

export const writtenFrom = {
  id: "01a0c57a-e7ac-7d09-ad25-98343aab07cf",
  type: "page-type/one-of-property",
  slug: "written-from",
  propertySlug: "written-from",
  definition: "a thing a construction writes its phrase from, in the order written",
  members: ["relation-property/part-of-speech", "relation-property/phrase-kind"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A construction names the same thing twice where its phrase is written twice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A construction naming its own phrase kind writes a phrase of any length.",
    },
  ],
  types: "ts",
} as const satisfies OneOfProperty
