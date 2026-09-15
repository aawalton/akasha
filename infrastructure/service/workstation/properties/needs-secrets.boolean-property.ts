import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const needsSecrets = {
  id: "01a05a3f-b42c-7a21-9e12-f4819b25195b",
  type: "page-type/boolean-property",
  slug: "needs-secrets",
  propertySlug: "needs-secrets",
  definition: "whether a service is handed the secrets in the home directory",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A service stating true is handed every secret the file has rather than some secrets.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service stating nothing is handed no secret.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
