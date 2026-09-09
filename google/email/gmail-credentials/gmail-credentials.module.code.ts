import { requireEnv } from "@akasha/utils/narrow/require-env"
import {
  type GoogleOauthAppCredentials,
  readGoogleOauthAppCredentials,
} from "akasha/google/oauth/oauth-app-credentials/oauth-app-credentials.module.code.ts"

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
    refreshToken: requireEnv("GOOGLE_GMAIL_OAUTH_REFRESH_TOKEN"),
  }
}
