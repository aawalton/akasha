import { readGoogleOauthAppCredentials } from "akasha/alan/google/oauth/oauth-app-credentials/oauth-app-credentials.module.code.ts"
import type { GoogleOauthRefreshCredentials } from "akasha/alan/google/oauth/oauth-client/oauth-client.module.code.ts"
import { optionalEnv, requireEnv } from "akasha/utils/narrow/require-env/require-env.module.code.ts"

export const SHARED_TOKEN_VAR = "GOOGLE_OAUTH_REFRESH_TOKEN"

function readGoogleRefreshToken(ownVar: string): string {
  const shared = optionalEnv(SHARED_TOKEN_VAR)
  if (shared !== undefined) return shared
  return requireEnv(ownVar)
}

export function readGoogleOauthCredentials(ownVar: string): GoogleOauthRefreshCredentials {
  return {
    ...readGoogleOauthAppCredentials(),
    refreshToken: readGoogleRefreshToken(ownVar),
  }
}
