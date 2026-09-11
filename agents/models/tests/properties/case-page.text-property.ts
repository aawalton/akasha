import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const casePage = {
  id: "01a05f8d-eaa0-7000-8c49-cf81f87d38a4",
  type: "text-property",
  slug: "case-page",
  propertySlug: "page",
  definition: "the name of the page a case is drawn from",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name whose page is renamed or deleted stays as the case was written.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
