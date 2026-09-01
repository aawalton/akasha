import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type NeedsSecrets = boolean

export const needsSecrets = {
  id: "01a05a3f-b42c-7a21-9e12-f4819b25195b",
  pageTypeSlug: "boolean-property",
  slug: "needs-secrets",
  propertySlug: "needs-secrets",
  definition: "whether a service is handed the secrets standing in the home directory",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A service stating true is handed every secret the file holds rather than some secrets.",
    },
    {
      invariantKind: "departure",
      statement: "A service stating nothing is handed none.",
    },
  ],
} as const satisfies BooleanProperty
