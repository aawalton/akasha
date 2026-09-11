import { auth } from "@googleapis/gmail"
import { readGmailCredentials } from "akasha/alan/google/email/gmail-credentials/gmail-credentials.module.code.ts"
import { makeGoogleOauthClient } from "akasha/alan/google/oauth/oauth-client/oauth-client.module.code.ts"

export type GmailAuthClient = InstanceType<typeof auth.OAuth2>

export function makeAuthClient(): GmailAuthClient {
  return makeGoogleOauthClient(auth.OAuth2, readGmailCredentials())
}
