import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const secretBuildEnv = {
  id: "01a0c68d-cc69-78aa-9654-3b0eee768f10",
  type: "page-type/record-property",
  slug: "secret-build-env",
  propertySlug: "secret-build-env",
  definition: "a value a build is handed, read from a cluster secret as the build runs",
  properties: [
    { pageProperty: "text-property/build-env-name", required: true, many: false },
    { pageProperty: "record-property/build-env-secret", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The secret named here is what tells this from the one written out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A secret nothing readable is under refuses the deploy before the build begins.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
