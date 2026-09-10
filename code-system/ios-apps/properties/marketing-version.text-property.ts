import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type MarketingVersion = string

export const marketingVersion = {
  id: "01a05f96-1925-7984-9108-b4d5346476fc",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "marketing-version",
  propertySlug: "marketing-version",
  definition: "the version of an app a person reads on the App Store",
  maxLength: 20,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A version is up to three numbers parted by dots.",
    },
    {
      invariantKind: "departure",
      statement: "A version is unchanged by an upload.",
    },
    {
      invariantKind: "gap",
      statement: "A build gives an app the version its page states.",
    },
  ],
} as const satisfies TextProperty
