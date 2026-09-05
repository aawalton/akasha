import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type RevokedAt = string

export const deviceSecretRevokedAt = {
  id: "01a05b39-f50c-73d4-bf1e-b7d036cba922",
  pageTypeSlug: "instant-property",
  slug: "device-secret-revoked-at",
  propertySlug: "revoked-at",
  definition: "when a device secret stopped being taken",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A device secret stating no value for this property still stands.",
    },
  ],
} as const satisfies InstantProperty
