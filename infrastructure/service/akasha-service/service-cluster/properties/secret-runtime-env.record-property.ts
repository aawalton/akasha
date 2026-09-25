import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const secretRuntimeEnv = {
  id: "01a0d5dd-3f42-73e0-a5fa-6adebc5c3add",
  type: "page-type/record-property",
  slug: "secret-runtime-env",
  propertySlug: "secret-runtime-env",
  definition: "a value a running container is handed, read from a cluster secret as it starts",
  properties: [
    { pageProperty: "text-property/runtime-env-name", required: true, many: false },
    { pageProperty: "record-property/runtime-env-secret", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The secret named here is what tells this from the one written out.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
