import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const statedRuntimeEnv = {
  id: "01a0d5dd-3f42-7870-a29e-2742cdeb028d",
  type: "page-type/record-property",
  slug: "stated-runtime-env",
  propertySlug: "stated-runtime-env",
  definition: "a value a running container is handed, written out on the cluster service's page",
  properties: [
    { pageProperty: "text-property/runtime-env-name", required: true, many: false },
    { pageProperty: "text-property/runtime-env-value", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The value written here is what tells this from the one read from a secret.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
