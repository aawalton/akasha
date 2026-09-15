import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const resourceKind = {
  id: "01a05a41-58c4-774b-900e-126b3c832eb0",
  type: "page-type/text-property",
  slug: "resource-kind",
  propertySlug: "resource-kind",
  definition: "the kind of cluster resource a service is",
  maxLength: 50,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The kind named here has a pod template.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
