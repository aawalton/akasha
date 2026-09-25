import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const runtimeEnvSecret = {
  id: "01a0d5dd-3f41-754b-956e-7374c84cce06",
  type: "page-type/record-property",
  slug: "runtime-env-secret",
  propertySlug: "from-secret",
  definition: "the cluster secret and the key holding a running container's value",
  properties: [
    { pageProperty: "text-property/resource-name", required: true, many: false },
    { pageProperty: "text-property/resource-key", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The secret is named rather than carried, so the value itself is no page's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The secret is read from the namespace the workload runs in.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
