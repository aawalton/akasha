import type { OneOfProperty } from "akasha/page/one-of-property/one-of-property.page-type.types.ts"

export const buildEnv = {
  id: "01a0c68d-ed1f-76c5-9578-efb260f5d56b",
  type: "page-type/one-of-property",
  slug: "build-env",
  propertySlug: "build-env",
  definition: "a value the build of the app a manifest applies is handed",
  members: ["record-property/stated-build-env", "record-property/secret-build-env"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A value is written out here or read from a cluster secret, never both.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which of the two an entry is follows from whether that entry names a secret.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No value a build is handed is written into the code beside the manifest.",
    },
  ],
  types: "ts",
} as const satisfies OneOfProperty
