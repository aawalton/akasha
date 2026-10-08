import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const deviceSecretHash = {
  id: "01a05b39-f50c-7eb2-a48c-d4679699f045",
  type: "page-type/text-property",
  slug: "device-secret-hash",
  propertySlug: "secret-hash",
  definition: "the sha-256 of the secret a device presents, written as lower hex",
  maxLength: 64,
  nameFormat: null,
  unique: "unique-kind/page-type",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here is reversible to the secret the hash was taken over.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-01T04:28:40.076Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies TextProperty
