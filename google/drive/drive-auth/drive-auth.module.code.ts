import { auth } from "@googleapis/drive"
import { makeGoogleOauthClient } from "akasha/google/oauth/oauth-client/oauth-client.module.code.ts"
import { readDriveCredentials } from "../drive-credentials/drive-credentials.module.code.ts"

export type DriveAuthClient = InstanceType<typeof auth.OAuth2>

export function makeAuthClient(): DriveAuthClient {
  return makeGoogleOauthClient(auth.OAuth2, readDriveCredentials())
}
