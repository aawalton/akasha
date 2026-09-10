import type { TextProperty } from "@akasha/pages/text-property"

export type PersonAuthorityTarget = string

export const personAuthorityTarget = {
  id: "01a05430-c0f0-78db-bb0e-ea07c84713f0",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "person-authority-target",
  propertySlug: "target",
  definition: "the area the authority covers",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A target of `all` is every area there is.",
    },
    {
      invariantKind: "departure",
      statement:
        "A target closing with `-*` is every area whose slug opens with the text before the `-*`.",
    },
  ],
} as const satisfies TextProperty
