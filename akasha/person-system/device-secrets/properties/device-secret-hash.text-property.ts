import type { TextProperty } from "@akasha/pages-system/text-property"

export type SecretHash = string

export const deviceSecretHash = {
  id: "01a05b39-f50c-7eb2-a48c-d4679699f045",
  pageTypeSlug: "text-property",
  slug: "device-secret-hash",
  propertySlug: "secret-hash",
  definition: "the sha-256 of the secret a device presents, written as lower hex",
  max: 64,
  nameFormatSlug: null,
  unique: "page-type",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here is reversible to the secret the hash was taken over.",
    },
  ],
} as const satisfies TextProperty
