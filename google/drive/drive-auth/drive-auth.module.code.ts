import { makeGoogleOauthClient } from "@akasha/google-oauth/oauth-client"
import { auth } from "@googleapis/drive"
import { readDriveCredentials } from "../drive-credentials/drive-credentials.module.code.ts"

export type DriveAuthClient = InstanceType<typeof auth.OAuth2>

export function makeAuthClient(): DriveAuthClient {
  return makeGoogleOauthClient(auth.OAuth2, readDriveCredentials())
}
