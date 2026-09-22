import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const statedBuildEnv = {
  id: "01a0c68d-b3c4-7c67-859b-6fe33468563b",
  type: "page-type/record-property",
  slug: "stated-build-env",
  propertySlug: "stated-build-env",
  definition: "a value a build is handed, written out on the manifest's page",
  properties: [
    { pageProperty: "text-property/build-env-name", required: true, many: false },
    { pageProperty: "text-property/build-env-value", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The value is the text written here rather than a name of where to look.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The value written here is what tells this from the one read from a secret.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
