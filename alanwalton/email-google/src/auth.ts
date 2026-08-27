import { auth } from "@googleapis/gmail"
import { readGmailCredentials } from "./env"

export type GmailAuthClient = InstanceType<typeof auth.OAuth2>

export function makeAuthClient(): GmailAuthClient {
  const { clientId, clientSecret, refreshToken } = readGmailCredentials()
  const client = new auth.OAuth2({ clientId, clientSecret })
  client.setCredentials({ refresh_token: refreshToken })
  return client
}
