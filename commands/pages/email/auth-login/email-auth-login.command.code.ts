import { emailGoogle } from "akasha/google/email/email-operations/email-operations.module.code.ts"
import { readGoogleOauthAppCredentials } from "akasha/google/oauth/oauth-app-credentials/oauth-app-credentials.module.code.ts"
import { googleOauthConsentSaying } from "akasha/google/oauth/oauth-consent/oauth-consent.module.code.ts"
import {
  answeredBy,
  type Read,
  readTaking,
  refusing,
} from "../../../../google/email/email-command-reading/email-command-reading.module.code.ts"
import type { Answer } from "../../../modules/calling/calling.module.code.ts"

const CALLBACK_URL = "--callback-url"

const TOKEN_VAR = "GOOGLE_GMAIL_OAUTH_REFRESH_TOKEN"

const TAKING = { valued: [CALLBACK_URL] } as const

export function readIn(argv: readonly string[]): Read {
  return readTaking(argv, TAKING)
}

export function emailAuthLogin(argv: readonly string[]): Promise<Answer> {
  const said = readIn(argv)
  if ("refused" in said) return Promise.resolve(refusing(said.refused, 1))
  return answeredBy(async () => {
    const google = await emailGoogle()
    const { clientId, clientSecret } = readGoogleOauthAppCredentials()
    const lines = await googleOauthConsentSaying({
      scopes: google.GMAIL_SCOPES,
      clientId,
      clientSecret,
      tokenVar: TOKEN_VAR,
      callbackUrl: said.one[CALLBACK_URL],
    })
    return { report: lines, refusals: [], code: 0 }
  })
}
