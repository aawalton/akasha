import { auth } from "@googleapis/calendar"
import {
  CALENDAR_SCOPE,
  readCalendarCredentials,
  readCalendarOauthCredentials,
} from "akasha/alan/google/calendar/modules/calendar-credentials/calendar-credentials.module.code.ts"
import { makeGoogleOauthClient } from "akasha/alan/google/oauth/modules/oauth-client/oauth-client.module.code.ts"

type CalendarAuthClient = InstanceType<typeof auth.JWT>

type CalendarOauthClient = InstanceType<typeof auth.OAuth2>

export function makeAuthClient(): CalendarAuthClient {
  const { clientEmail, privateKey } = readCalendarCredentials()
  return new auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: [CALENDAR_SCOPE],
  })
}

export function makeOAuthClient(): CalendarOauthClient {
  return makeGoogleOauthClient(auth.OAuth2, readCalendarOauthCredentials())
}
