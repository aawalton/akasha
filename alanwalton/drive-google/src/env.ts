import { requireEnv } from "@shared/utils-narrow/require-env"

export const DRIVE_SCOPES = ["https://www.googleapis.com/auth/drive.readonly"] as const

export interface DriveOauthAppCredentials {
  readonly clientId: string
  readonly clientSecret: string
}

export interface DriveCredentials extends DriveOauthAppCredentials {
  readonly refreshToken: string
}

export function readDriveOauthAppCredentials(): DriveOauthAppCredentials {
  return {
    clientId: requireEnv("GOOGLE_GMAIL_OAUTH_CLIENT_ID"),
    clientSecret: requireEnv("GOOGLE_GMAIL_OAUTH_CLIENT_SECRET"),
  }
}

export function readDriveCredentials(): DriveCredentials {
  return {
    ...readDriveOauthAppCredentials(),
    refreshToken: requireEnv("GOOGLE_DRIVE_OAUTH_REFRESH_TOKEN"),
  }
}
