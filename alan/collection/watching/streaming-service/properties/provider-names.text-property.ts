import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const providerNames = {
  id: "01a18432-af58-7a84-b61a-85070fe27628",
  type: "page-type/text-property",
  slug: "provider-names",
  propertySlug: "provider-names",
  definition: "a name TMDB gives a streaming service by",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A name is written as TMDB writes it, trimmed of the spaces around it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No name is listed by two services.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-28T20:27:56.630Z",
  updatedAt: "2026-10-28T20:27:56.630Z",
} as const satisfies TextProperty
