import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type SecretResource = string

export const secretResource = {
  id: "01a08cfa-dafb-7b31-884e-718e64f5308b",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "secret-resource",
  propertySlug: "secret-resource",
  definition: "the cluster resource a web app's secret values are placed in",
  maxLength: 253,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The resource is named on the page rather than written into the code reaching for its values.",
    },
    {
      invariantKind: "departure",
      statement:
        "A web app's secret values are the values the secret pages place in this resource.",
    },
  ],
} as const satisfies TextProperty
