import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const namePatterns = {
  id: "01a0d588-4e54-7ef6-9f7e-c030c070bab3",
  type: "page-type/text-property",
  slug: "name-patterns",
  propertySlug: "name-patterns",
  definition: "the patterns a file's name matches for this to reach that file",
  maxLength: 40,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A pattern is matched against a file's name rather than the path to that file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pattern holds at most one star, and the star matches one character or more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pattern with no star matches only the name that pattern spells.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pattern with no star is taken before a pattern ending in its star.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pattern ending in its star is taken before every other pattern with a star.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Among the rest, the pattern holding more besides its star is taken first.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
