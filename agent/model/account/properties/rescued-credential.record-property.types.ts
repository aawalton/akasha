import type { RescuedAccessToken } from "akasha/agent/model/account/properties/rescued-access-token.text-property.types.ts"
import type { RescuedExpiresAtMs } from "akasha/agent/model/account/properties/rescued-expires-at-ms.number-property.types.ts"
import type { RescuedRefreshToken } from "akasha/agent/model/account/properties/rescued-refresh-token.text-property.types.ts"

export type RescuedCredential = {
  accessToken: RescuedAccessToken
  refreshToken: RescuedRefreshToken
  expiresAtMs: RescuedExpiresAtMs
}
