import type { TextProperty } from "@akasha/pages-system/text-property"

export type SpaSourcePath = string

export const spaSourcePath = {
  id: "01a05cc9-7251-72dc-8830-f9413bbb6333",
  pageTypeSlug: "text-property",
  slug: "spa-source-path",
  propertySlug: "spa-source-path",
  definition: "where the site an app serves is built from",
  max: 200,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "This path is read against the repository root rather than the app's package.",
    },
    {
      invariantKind: "departure",
      statement: "An app whose site stands beside its page states none of this.",
    },
  ],
} as const satisfies TextProperty
