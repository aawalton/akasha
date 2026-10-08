import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const pattern = {
  id: "01a05950-57fe-7e42-81cf-987da9b05f9e",
  type: "page-type/text-property",
  slug: "pattern",
  propertySlug: "pattern",
  definition: "the regular expression that finds a taboo term in changed text",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A pattern is matched without regard to case.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A pattern is matched against the added text as well as against a copy split at its camelCase seams.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pattern therefore needs no case of its own to reach inside a camelCase name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pattern narrows only to leave out the senses the term never means.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pattern that does not compile is no pattern.",
    },
  ],
  types: "ts",
  createdAt: "2026-08-31T19:33:52.766Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies TextProperty
