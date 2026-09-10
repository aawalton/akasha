import type { InstantProperty } from "@akasha/pages/instant-property"

export type DeviceSecretRevokedAt = string

export const deviceSecretRevokedAt = {
  id: "01a05b39-f50c-73d4-bf1e-b7d036cba922",
  pageTypeSlug: "instant-property",
  type: "instant-property",
  slug: "device-secret-revoked-at",
  propertySlug: "revoked-at",
  definition: "when a device secret stopped being taken",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A device secret stating no value for this property remains taken.",
    },
  ],
} as const satisfies InstantProperty
