import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const imageRepository = {
  id: "01a08d9f-90c7-73d8-85fa-29e1f90a26a9",
  type: "text-property",
  slug: "image-repository",
  propertySlug: "repository",
  definition: "the path an image is pushed to in the cluster's registry",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The path carries no tag, because the tag is the hash of the build inputs.",
    },
    {
      invariantKind: "departure",
      statement: "An image nothing pushes states no repository.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
