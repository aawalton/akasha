import { auth } from "@googleapis/drive"
import { readDriveCredentials } from "../drive-credentials/drive-credentials.module.code.ts"

export type DriveAuthClient = InstanceType<typeof auth.OAuth2>

export function makeAuthClient(): DriveAuthClient {
  const { clientId, clientSecret, refreshToken } = readDriveCredentials()
  const client = new auth.OAuth2({ clientId, clientSecret })
  client.setCredentials({ refresh_token: refreshToken })
  return client
}
