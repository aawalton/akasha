import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const buildEnvSecret = {
  id: "01a0c68d-9e02-77f4-8789-5bde389bd861",
  type: "page-type/record-property",
  slug: "build-env-secret",
  propertySlug: "from-secret",
  definition: "the cluster secret and the key holding a build's value",
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
      statement: "The secret is read from the namespace the workload built is in.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-22T00:39:24.930Z",
  updatedAt: "2026-09-22T13:59:20.000Z",
} as const satisfies RecordProperty
