import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type OpenQuestion = string

export const openQuestion = {
  id: "01a077d9-ec58-7954-9180-8711659f84bd",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "open-question",
  propertySlug: "ask",
  definition: "what is still open about a topic, put as one question",
  maxLength: 200,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "An ask is written as a question rather than as a note naming a gap.",
    },
    {
      invariantKind: "departure",
      statement: "An ask has no paragraph break.",
    },
  ],
} as const satisfies TextProperty
