import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type DeviceSecretHash = string

export const deviceSecretHash = {
  id: "01a05b39-f50c-7eb2-a48c-d4679699f045",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "device-secret-hash",
  propertySlug: "secret-hash",
  definition: "the sha-256 of the secret a device presents, written as lower hex",
  maxLength: 64,
  nameFormat: null,
  unique: "page-type",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here is reversible to the secret the hash was taken over.",
    },
  ],
} as const satisfies TextProperty
