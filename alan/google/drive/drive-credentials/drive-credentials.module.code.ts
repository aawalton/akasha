import {
  type GoogleOauthAppCredentials,
  readGoogleOauthAppCredentials,
} from "akasha/alan/google/oauth/oauth-app-credentials/oauth-app-credentials.module.code.ts"
import { readGoogleRefreshToken } from "akasha/alan/google/oauth/oauth-refresh-token/oauth-refresh-token.module.code.ts"

export const DRIVE_SCOPES = ["https://www.googleapis.com/auth/drive.readonly"] as const

export interface DriveCredentials extends GoogleOauthAppCredentials {
  readonly refreshToken: string
}

export function readDriveCredentials(): DriveCredentials {
  return {
    ...readGoogleOauthAppCredentials(),
    refreshToken: readGoogleRefreshToken("GOOGLE_DRIVE_OAUTH_REFRESH_TOKEN"),
  }
}
