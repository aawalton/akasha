import type { TextProperty } from "@akasha/pages-system/text-property"

export type ResourceName = string

export const resourceName = {
  id: "01a05a41-58c5-7070-8223-2b245078d3b9",
  pageTypeSlug: "text-property",
  slug: "resource-name",
  propertySlug: "resource-name",
  definition: "the name a resource carries in the cluster",
  max: 63,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The resource name is what the cluster is asked for rather than the page's own slug.",
    },
  ],
} as const satisfies TextProperty
