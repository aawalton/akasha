import type { Page } from "akasha/page/page.page-type.types.ts"
import type { DeviceSecretContributor } from "akasha/person/device-secret/properties/device-secret-contributor.relation-property.types.ts"
import type { DeviceSecretDeviceId } from "akasha/person/device-secret/properties/device-secret-device-id.text-property.types.ts"
import type { DeviceSecretHash } from "akasha/person/device-secret/properties/device-secret-hash.text-property.types.ts"
import type { DeviceSecretRevokedAt } from "akasha/person/device-secret/properties/device-secret-revoked-at.instant-property.types.ts"
import type { DeviceSecretUserId } from "akasha/person/device-secret/properties/device-secret-user-id.text-property.types.ts"

export type DeviceSecret = Page & {
  userId?: DeviceSecretUserId
  deviceId: DeviceSecretDeviceId
  secretHash: DeviceSecretHash
  revokedAt?: DeviceSecretRevokedAt
  contributor?: DeviceSecretContributor
}
