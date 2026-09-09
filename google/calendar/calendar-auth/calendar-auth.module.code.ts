import { auth } from "@googleapis/calendar"
import { makeGoogleOauthClient } from "akasha/google/oauth/oauth-client/oauth-client.module.code.ts"
import {
  CALENDAR_SCOPE,
  readCalendarCredentials,
  readCalendarOauthCredentials,
} from "../calendar-credentials/calendar-credentials.module.code.ts"

export type CalendarAuthClient = InstanceType<typeof auth.JWT>

export type CalendarOauthClient = InstanceType<typeof auth.OAuth2>

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
