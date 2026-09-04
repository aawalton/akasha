import { makeGoogleOauthClient } from "@akasha/google-oauth/oauth-client"
import { auth } from "@googleapis/gmail"
import { readGmailCredentials } from "../gmail-credentials/gmail-credentials.module.code.ts"

export type GmailAuthClient = InstanceType<typeof auth.OAuth2>

export function makeAuthClient(): GmailAuthClient {
  return makeGoogleOauthClient(auth.OAuth2, readGmailCredentials())
}
