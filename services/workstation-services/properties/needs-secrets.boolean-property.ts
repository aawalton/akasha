import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export type NeedsSecrets = boolean

export const needsSecrets = {
  id: "01a05a3f-b42c-7a21-9e12-f4819b25195b",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "needs-secrets",
  propertySlug: "needs-secrets",
  definition: "whether a service is handed the secrets in the home directory",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A service stating true is handed every secret the file has rather than some secrets.",
    },
    {
      invariantKind: "departure",
      statement: "A service stating nothing is handed no secret.",
    },
  ],
} as const satisfies BooleanProperty
