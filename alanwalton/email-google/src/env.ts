import { requireEnv } from "@shared/utils-narrow/require-env"

export const GMAIL_SCOPES = [
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.compose",
  "https://www.googleapis.com/auth/gmail.modify",
] as const

export interface GmailOauthAppCredentials {
  readonly clientId: string
  readonly clientSecret: string
}

export interface GmailCredentials extends GmailOauthAppCredentials {
  readonly refreshToken: string
}

export function readGmailOauthAppCredentials(): GmailOauthAppCredentials {
  return {
    clientId: requireEnv("GOOGLE_GMAIL_OAUTH_CLIENT_ID"),
    clientSecret: requireEnv("GOOGLE_GMAIL_OAUTH_CLIENT_SECRET"),
  }
}

export function readGmailCredentials(): GmailCredentials {
  return {
    ...readGmailOauthAppCredentials(),
    refreshToken: requireEnv("GOOGLE_GMAIL_OAUTH_REFRESH_TOKEN"),
  }
}
