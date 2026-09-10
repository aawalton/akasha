import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type ResourceName = string

export const resourceName = {
  id: "01a05a41-58c5-7070-8223-2b245078d3b9",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "resource-name",
  propertySlug: "resource-name",
  definition: "the name a resource carries in the cluster",
  maxLength: 63,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The resource name is the name the cluster is asked for rather than the page's own slug.",
    },
  ],
} as const satisfies TextProperty
