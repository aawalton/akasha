import type { TextProperty } from "@akasha/pages-system/text-property"

export type ResourceKind = string

export const resourceKind = {
  id: "01a05a41-58c4-774b-900e-126b3c832eb0",
  pageTypeSlug: "text-property",
  slug: "resource-kind",
  propertySlug: "resource-kind",
  definition: "the kind of cluster resource a service is",
  max: 50,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The kind named here carries a pod template.",
    },
  ],
} as const satisfies TextProperty
