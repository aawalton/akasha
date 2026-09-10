import {
  type GoogleOauthAppCredentials,
  readGoogleOauthAppCredentials,
} from "akasha/alan/google/oauth/oauth-app-credentials/oauth-app-credentials.module.code.ts"
import { readGoogleRefreshToken } from "akasha/alan/google/oauth/oauth-refresh-token/oauth-refresh-token.module.code.ts"

export const GMAIL_SCOPES = [
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.compose",
  "https://www.googleapis.com/auth/gmail.modify",
] as const

export interface GmailCredentials extends GoogleOauthAppCredentials {
  readonly refreshToken: string
}

export function readGmailCredentials(): GmailCredentials {
  return {
    ...readGoogleOauthAppCredentials(),
    refreshToken: readGoogleRefreshToken("GOOGLE_GMAIL_OAUTH_REFRESH_TOKEN"),
  }
}
