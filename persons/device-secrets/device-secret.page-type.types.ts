import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { DeviceSecretDeviceId } from "akasha/persons/device-secrets/properties/device-secret-device-id.text-property.ts"
import type { DeviceSecretHash } from "akasha/persons/device-secrets/properties/device-secret-hash.text-property.ts"
import type { DeviceSecretRevokedAt } from "akasha/persons/device-secrets/properties/device-secret-revoked-at.instant-property.types.ts"
import type { DeviceSecretUserId } from "akasha/persons/device-secrets/properties/device-secret-user-id.text-property.ts"

export type DeviceSecret = Page & {
  userId: DeviceSecretUserId
  deviceId: DeviceSecretDeviceId
  secretHash: DeviceSecretHash
  revokedAt?: DeviceSecretRevokedAt
}
