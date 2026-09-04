import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { DeviceId } from "./properties/device-secret-device-id.text-property.ts"
import type { SecretHash } from "./properties/device-secret-hash.text-property.ts"
import type { RevokedAt } from "./properties/device-secret-revoked-at.instant-property.ts"
import type { UserId } from "./properties/device-secret-user-id.text-property.ts"

export type DeviceSecret = Page & {
  userId: UserId
  deviceId: DeviceId
  secretHash: SecretHash
  revokedAt?: RevokedAt
}

export const deviceSecret = {
  id: "01a05b39-f50b-77c0-826c-a526838d12ac",
  pageTypeSlug: "page-type",
  slug: "device-secret",
  definition: "the credential one device presents in place of a session",
  pluralSlug: "device-secrets",
  extendsSlug: ["page-type/page"],
  partSlugs: [
    "instant-property/device-secret-revoked-at",
    "text-property/device-secret-device-id",
    "text-property/device-secret-hash",
    "text-property/device-secret-user-id",
  ],
  properties: [
    { pagePropertySlug: "device-secret-user-id", required: true, many: false },
    { pagePropertySlug: "device-secret-device-id", required: true, many: false },
    { pagePropertySlug: "device-secret-hash", required: true, many: false },
    { pagePropertySlug: "device-secret-revoked-at", required: false, many: false },
  ],
  mortal: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A device secret stands for the account the device secret was minted for.",
    },
    {
      invariantKind: "departure",
      statement: "A device secret opens what that account opens and nothing more.",
    },
    {
      invariantKind: "departure",
      statement: "One hash stands on one device secret.",
    },
    {
      invariantKind: "departure",
      statement: "A revoked device secret opens nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A device secret is reached by the person holding the device secret and the device the secret names.",
    },
    {
      invariantKind: "absence",
      statement: "The secret a device presents stands nowhere here.",
    },
    {
      invariantKind: "gap",
      statement: "A device secret last presented is said nowhere.",
    },
  ],
} as const satisfies PageType
