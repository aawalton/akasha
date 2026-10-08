import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const aliases = {
  id: "01a06558-a991-7721-9c7a-fb59e452d286",
  type: "page-type/text-property",
  slug: "aliases",
  propertySlug: "aliases",
  definition: "another name the text gives a thing",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An alias is written as the text writes the alias rather than as a slug is written.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T03:38:24.529Z",
  updatedAt: "2026-09-22T13:56:42.000Z",
} as const satisfies TextProperty
