import type { RescuedAccessToken } from "akasha/agents/claude-accounts/properties/rescued-access-token.text-property.types.ts"
import type { RescuedExpiresAtMs } from "akasha/agents/claude-accounts/properties/rescued-expires-at-ms.number-property.types.ts"
import type { RescuedRefreshToken } from "akasha/agents/claude-accounts/properties/rescued-refresh-token.text-property.types.ts"

export type RescuedCredential = {
  accessToken: RescuedAccessToken
  refreshToken: RescuedRefreshToken
  expiresAtMs: RescuedExpiresAtMs
}
