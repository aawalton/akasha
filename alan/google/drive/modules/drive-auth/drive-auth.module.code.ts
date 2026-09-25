import { auth } from "@googleapis/drive"
import { readDriveCredentials } from "akasha/alan/google/drive/modules/drive-credentials/drive-credentials.module.code.ts"
import { makeGoogleOauthClient } from "akasha/alan/google/oauth/modules/oauth-client/oauth-client.module.code.ts"

type DriveAuthClient = InstanceType<typeof auth.OAuth2>

export function makeAuthClient(): DriveAuthClient {
  return makeGoogleOauthClient(auth.OAuth2, readDriveCredentials())
}
