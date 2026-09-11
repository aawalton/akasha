import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const aliases = {
  id: "01a06558-a991-7721-9c7a-fb59e452d286",
  type: "text-property",
  slug: "aliases",
  propertySlug: "aliases",
  definition: "another name the text writes a thing under",
  maxLength: 200,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An alias is written as the text writes the alias rather than as a slug is written.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
