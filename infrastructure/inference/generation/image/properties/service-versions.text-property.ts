import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const serviceVersions = {
  id: "01a0de80-955e-7c3c-9417-137d29c0e007",
  type: "page-type/text-property",
  slug: "service-versions",
  propertySlug: "service-versions",
  definition: "each package a model service ran on to make a thing, with its version",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A value is the package's name, a space, then the version it ran at.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
