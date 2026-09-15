import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const personAuthorityTarget = {
  id: "01a05430-c0f0-78db-bb0e-ea07c84713f0",
  type: "page-type/text-property",
  slug: "person-authority-target",
  propertySlug: "target",
  definition: "the area the authority covers",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A target of `all` is every area there is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A target closing with `-*` is every area whose slug opens with the text before the `-*`.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
