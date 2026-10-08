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
  createdAt: "2026-08-31T23:57:07.140Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies TextProperty
