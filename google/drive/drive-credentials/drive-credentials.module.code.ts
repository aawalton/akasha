import { requireEnv } from "@akasha/utils/narrow/require-env"
import {
  type GoogleOauthAppCredentials,
  readGoogleOauthAppCredentials,
} from "akasha/google/oauth/oauth-app-credentials/oauth-app-credentials.module.code.ts"

export const DRIVE_SCOPES = ["https://www.googleapis.com/auth/drive.readonly"] as const

export interface DriveCredentials extends GoogleOauthAppCredentials {
  readonly refreshToken: string
}

export function readDriveCredentials(): DriveCredentials {
  return {
    ...readGoogleOauthAppCredentials(),
    refreshToken: requireEnv("GOOGLE_DRIVE_OAUTH_REFRESH_TOKEN"),
  }
}
