import type { TextProperty } from "@akasha/pages-system/text-property"

export type Image = string

export const image = {
  id: "01a05b26-f8b6-73e6-aedb-75b88fac6b4b",
  pageTypeSlug: "text-property",
  slug: "image",
  propertySlug: "image",
  definition: "the container image a workload's pods run",
  max: 253,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The image is named as the cluster's own registry hands the image out.",
    },
    {
      invariantKind: "departure",
      statement:
        "A workload running more than one container states the image of the one it is for.",
    },
  ],
} as const satisfies TextProperty
