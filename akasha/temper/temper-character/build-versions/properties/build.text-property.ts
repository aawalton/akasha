import type { TextProperty } from "@akasha/pages-system/text-property"

export type Build = string

export const build = {
  id: "01a0685d-89aa-749c-b7bc-b0f638217233",
  pageTypeSlug: "text-property",
  slug: "build",
  propertySlug: "build",
  definition: "the build a version was taken of",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    { invariantKind: "gap", statement: "This property is a relation to a build." },
    {
      invariantKind: "departure",
      statement: "A character build and a companion build are named here alike.",
    },
  ],
} as const satisfies TextProperty
