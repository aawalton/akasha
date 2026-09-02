import type { TextProperty } from "@akasha/pages-system/text-property"

export type GrimoireId = string

export const grimoireId = {
  id: "01a05fca-cb83-73a3-afc2-bf571210f393",
  pageTypeSlug: "text-property",
  slug: "grimoire-id",
  propertySlug: "grimoire-id",
  definition: "the grimoire a scribed skill is scribed from",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "gap",
      statement: "This property is a relation to a grimoire.",
    },
  ],
} as const satisfies TextProperty
