import { requireEnv } from "akasha/code/type/narrowing/modules/require-env/require-env.module.code.ts"

interface GoogleOauthAppCredentials {
  readonly clientId: string
  readonly clientSecret: string
}

export function readGoogleOauthAppCredentials(): GoogleOauthAppCredentials {
  return {
    clientId: requireEnv("GOOGLE_GMAIL_OAUTH_CLIENT_ID"),
    clientSecret: requireEnv("GOOGLE_GMAIL_OAUTH_CLIENT_SECRET"),
  }
}
