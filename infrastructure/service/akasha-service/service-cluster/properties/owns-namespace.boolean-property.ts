import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const ownsNamespace = {
  id: "01a0d5db-7608-7e90-bef7-b8f834d53ab9",
  type: "page-type/boolean-property",
  slug: "owns-namespace",
  propertySlug: "owns-namespace",
  definition: "whether a workload's manifests make the namespace that workload runs in",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A cluster service stating nothing here leaves its namespace to something else.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
