import type { GoogleOauthRefreshCredentials } from "akasha/alan/google/oauth/oauth-client/oauth-client.module.code.ts"
import { readGoogleOauthCredentials } from "akasha/alan/google/oauth/oauth-refresh-token/oauth-refresh-token.module.code.ts"

export const DRIVE_SCOPES = ["https://www.googleapis.com/auth/drive.readonly"] as const

export function readDriveCredentials(): GoogleOauthRefreshCredentials {
  return readGoogleOauthCredentials("GOOGLE_DRIVE_OAUTH_REFRESH_TOKEN")
}
