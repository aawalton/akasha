import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const levelName = {
  id: "01a093f5-ae9f-72c3-876a-43c8d863335d",
  type: "text-property",
  slug: "level-name",
  propertySlug: "name",
  definition: "the word or words one level of the command tree is reached by",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name carries no part of the name of the level above it.",
    },
    {
      invariantKind: "departure",
      statement: "A name is matched whole against one word of the command line.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
