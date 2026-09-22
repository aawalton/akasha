import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const loreSubject = {
  id: "01a0c949-d283-74c2-86bb-6ca1d8350a74",
  type: "page-type/text-property",
  slug: "lore-subject",
  propertySlug: "subject",
  definition: "what in a game's world a lore entry is about",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every entry about one thing names that thing the same way.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "What an entry is about is a name rather than the page for that thing.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
