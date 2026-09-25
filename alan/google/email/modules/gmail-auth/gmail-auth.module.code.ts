import { auth } from "@googleapis/gmail"
import { readGmailCredentials } from "akasha/alan/google/email/modules/gmail-credentials/gmail-credentials.module.code.ts"
import { makeGoogleOauthClient } from "akasha/alan/google/oauth/modules/oauth-client/oauth-client.module.code.ts"

type GmailAuthClient = InstanceType<typeof auth.OAuth2>

export function makeAuthClient(): GmailAuthClient {
  return makeGoogleOauthClient(auth.OAuth2, readGmailCredentials())
}
