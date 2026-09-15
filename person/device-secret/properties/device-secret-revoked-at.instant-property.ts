import type { InstantProperty } from "akasha/page/instant-property/instant-property.page-type.types.ts"

export const deviceSecretRevokedAt = {
  id: "01a05b39-f50c-73d4-bf1e-b7d036cba922",
  type: "page-type/instant-property",
  slug: "device-secret-revoked-at",
  propertySlug: "revoked-at",
  definition: "when a device secret stopped being taken",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A device secret stating no value for this property remains taken.",
    },
  ],
  types: "ts",
} as const satisfies InstantProperty
