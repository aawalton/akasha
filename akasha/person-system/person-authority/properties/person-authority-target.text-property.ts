import type { TextProperty } from "@akasha/pages-system/text-property"

export type Target = string

export const personAuthorityTarget = {
  id: "01a05430-c0f0-78db-bb0e-ea07c84713f0",
  pageTypeSlug: "text-property",
  slug: "person-authority-target",
  propertySlug: "target",
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
        "A target closing with `-*` is every area whose slug opens with what stands before the `-*`.",
    },
  ],
} as const satisfies TextProperty
