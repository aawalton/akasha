import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const resourceName = {
  id: "01a05a41-58c5-7070-8223-2b245078d3b9",
  type: "page-type/text-property",
  slug: "resource-name",
  propertySlug: "resource-name",
  definition: "the name a resource carries in the cluster",
  maxLength: 63,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The resource name is the name the cluster is asked for rather than the page's own slug.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
