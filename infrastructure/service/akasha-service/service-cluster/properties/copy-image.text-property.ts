import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const copyImage = {
  id: "01a0d984-8902-7c4c-a4d8-932da756e605",
  type: "page-type/text-property",
  slug: "copy-image",
  propertySlug: "image",
  definition: "the container image files are copied out of",
  maxLength: 253,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The image is named as the cluster's own registry hands the image out.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
