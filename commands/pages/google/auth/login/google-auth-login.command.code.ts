import { CALENDAR_OAUTH_SCOPE } from "akasha/alan/google/calendar/calendar-credentials/calendar-credentials.module.code.ts"
import { DRIVE_SCOPES } from "akasha/alan/google/drive/drive-credentials/drive-credentials.module.code.ts"
import { GMAIL_SCOPES } from "akasha/alan/google/email/gmail-credentials/gmail-credentials.module.code.ts"
import { readGoogleOauthAppCredentials } from "akasha/alan/google/oauth/oauth-app-credentials/oauth-app-credentials.module.code.ts"
import { googleOauthConsentSaying } from "akasha/alan/google/oauth/oauth-consent/oauth-consent.module.code.ts"
import { SHARED_TOKEN_VAR } from "akasha/alan/google/oauth/oauth-refresh-token/oauth-refresh-token.module.code.ts"
import {
  answeredBy,
  type Read,
  readTaking,
  refusing,
} from "../../../../../alan/google/email/email-command-reading/email-command-reading.module.code.ts"
import type { Answer } from "../../../../modules/calling/calling.module.code.ts"

const CALLBACK_URL = "--callback-url"

const TAKING = { valued: [CALLBACK_URL] } as const

export const SCOPES: readonly string[] = [CALENDAR_OAUTH_SCOPE, ...DRIVE_SCOPES, ...GMAIL_SCOPES]

export function readIn(argv: readonly string[]): Read {
  return readTaking(argv, TAKING)
}

export function googleAuthLogin(argv: readonly string[]): Promise<Answer> {
  const said = readIn(argv)
  if ("refused" in said) return Promise.resolve(refusing(said.refused, 1))
  return answeredBy(async () => {
    const { clientId, clientSecret } = readGoogleOauthAppCredentials()
    const lines = await googleOauthConsentSaying({
      scopes: SCOPES,
      clientId,
      clientSecret,
      tokenVar: SHARED_TOKEN_VAR,
      callbackUrl: said.one[CALLBACK_URL],
    })
    return { report: lines, refusals: [], code: 0 }
  })
}
