import type { GoogleOauthRefreshCredentials } from "akasha/alan/google/oauth/modules/oauth-client/oauth-client.module.code.ts"
import { readGoogleOauthCredentials } from "akasha/alan/google/oauth/modules/oauth-refresh-token/oauth-refresh-token.module.code.ts"

export const SHEETS_SCOPES = ["https://www.googleapis.com/auth/spreadsheets"] as const

export function readSheetsCredentials(): GoogleOauthRefreshCredentials {
  return readGoogleOauthCredentials("GOOGLE_SHEETS_OAUTH_REFRESH_TOKEN")
}
