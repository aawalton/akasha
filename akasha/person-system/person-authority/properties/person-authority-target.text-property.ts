import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type Target = string

export const personAuthorityTarget = {
  id: "01a05430-c0f0-78db-bb0e-ea07c84713f0",
  pageTypeSlug: "text-property",
  slug: "person-authority-target",
  propertySlug: "person-authority-target",
  definition: "the area the authority covers",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A target of `all` is every area there is.",
    },
    {
      invariantKind: "departure",
      statement:
        "A target closing with `-*` is every area whose slug opens with what stands before it.",
    },
  ],
} as const satisfies TextProperty
