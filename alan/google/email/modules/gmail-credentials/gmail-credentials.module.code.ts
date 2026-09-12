import type { GoogleOauthRefreshCredentials } from "akasha/alan/google/oauth/modules/oauth-client/oauth-client.module.code.ts"
import { readGoogleOauthCredentials } from "akasha/alan/google/oauth/modules/oauth-refresh-token/oauth-refresh-token.module.code.ts"

export const GMAIL_SCOPES = [
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.compose",
  "https://www.googleapis.com/auth/gmail.modify",
] as const

export function readGmailCredentials(): GoogleOauthRefreshCredentials {
  return readGoogleOauthCredentials("GOOGLE_GMAIL_OAUTH_REFRESH_TOKEN")
}
