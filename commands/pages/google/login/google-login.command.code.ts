import { CALENDAR_OAUTH_SCOPE } from "akasha/alan/google/calendar/calendar-credentials/calendar-credentials.module.code.ts"
import { DRIVE_SCOPES } from "akasha/alan/google/drive/drive-credentials/drive-credentials.module.code.ts"
import {
  answeredBy,
  refusing,
} from "akasha/alan/google/email/email-command-reading/email-command-reading.module.code.ts"
import { GMAIL_SCOPES } from "akasha/alan/google/email/gmail-credentials/gmail-credentials.module.code.ts"
import { readGoogleOauthAppCredentials } from "akasha/alan/google/oauth/oauth-app-credentials/oauth-app-credentials.module.code.ts"
import { googleOauthConsentSaying } from "akasha/alan/google/oauth/oauth-consent/oauth-consent.module.code.ts"
import { SHARED_TOKEN_VAR } from "akasha/alan/google/oauth/oauth-refresh-token/oauth-refresh-token.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { callbackUrl } from "akasha/commands/arguments/pages/callback-url.argument.ts"
import { INPUT, told } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { googleLogin as page } from "akasha/commands/pages/google/login/google-login.command.ts"

export const SCOPES: readonly string[] = [CALENDAR_OAUTH_SCOPE, ...DRIVE_SCOPES, ...GMAIL_SCOPES]

export function googleLogin(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [callbackUrl])
  if ("refused" in read) return Promise.resolve(refusing(read.refused, INPUT))
  const taken = read.taken
  return answeredBy(async (done) => {
    const { clientId, clientSecret } = readGoogleOauthAppCredentials()
    const lines = await googleOauthConsentSaying(
      {
        scopes: SCOPES,
        clientId,
        clientSecret,
        tokenVar: SHARED_TOKEN_VAR,
        callbackUrl: taken.callbackUrl,
      },
      done
    )
    return told(lines)
  })
}
