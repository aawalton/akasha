import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const buildEnvValue = {
  id: "01a0c68d-86eb-7607-8c2f-47b1f35b592c",
  type: "page-type/text-property",
  slug: "build-env-value",
  propertySlug: "value",
  definition: "the text a build is handed under an environment variable",
  maxLength: 4096,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A value written here is read from the page rather than from the cluster.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No secret is written here.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-22T00:39:19.019Z",
  updatedAt: "2026-09-22T00:45:14.000Z",
} as const satisfies TextProperty
