import type { Page } from "../../pages/page.page-type.types.ts"
import type { DeviceSecretDeviceId } from "./properties/device-secret-device-id.text-property.ts"
import type { DeviceSecretHash } from "./properties/device-secret-hash.text-property.ts"
import type { DeviceSecretRevokedAt } from "./properties/device-secret-revoked-at.instant-property.ts"
import type { DeviceSecretUserId } from "./properties/device-secret-user-id.text-property.ts"

export type DeviceSecret = Page & {
  userId: DeviceSecretUserId
  deviceId: DeviceSecretDeviceId
  secretHash: DeviceSecretHash
  revokedAt?: DeviceSecretRevokedAt
}
