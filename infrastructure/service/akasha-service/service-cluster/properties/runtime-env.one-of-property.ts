import type { OneOfProperty } from "akasha/page/one-of-property/one-of-property.page-type.types.ts"

export const runtimeEnv = {
  id: "01a0d5dd-3f41-7376-a101-938edc58da31",
  type: "page-type/one-of-property",
  slug: "runtime-env",
  propertySlug: "runtime-env",
  definition: "a value a workload's container is handed beyond the ones every container gets",
  members: ["record-property/stated-runtime-env", "record-property/secret-runtime-env"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A value is written out here or read from a cluster secret, never both.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The values are handed to the container in the order the page states them.",
    },
  ],
  types: "ts",
} as const satisfies OneOfProperty
