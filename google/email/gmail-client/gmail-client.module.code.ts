import { gmail, type gmail_v1 } from "@googleapis/gmail"
import { makeAuthClient } from "../gmail-auth/gmail-auth.module.code.ts"

export interface GmailClient {
  readonly raw: gmail_v1.Gmail
}

export async function makeGmailClient(): Promise<GmailClient> {
  const auth = makeAuthClient()
  const raw = gmail({ version: "v1", auth })
  return { raw }
}
