import { auth } from "@googleapis/drive"
import { readDriveCredentials } from "akasha/alan/google/drive/drive-credentials/drive-credentials.module.code.ts"
import { makeGoogleOauthClient } from "akasha/alan/google/oauth/oauth-client/oauth-client.module.code.ts"

export type DriveAuthClient = InstanceType<typeof auth.OAuth2>

export function makeAuthClient(): DriveAuthClient {
  return makeGoogleOauthClient(auth.OAuth2, readDriveCredentials())
}
