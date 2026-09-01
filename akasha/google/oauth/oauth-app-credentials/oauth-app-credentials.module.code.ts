import { requireEnv } from "@akasha/utils-narrow/require-env"

export interface GoogleOauthAppCredentials {
  readonly clientId: string
  readonly clientSecret: string
}

export function readGoogleOauthAppCredentials(): GoogleOauthAppCredentials {
  return {
    clientId: requireEnv("GOOGLE_GMAIL_OAUTH_CLIENT_ID"),
    clientSecret: requireEnv("GOOGLE_GMAIL_OAUTH_CLIENT_SECRET"),
  }
}
