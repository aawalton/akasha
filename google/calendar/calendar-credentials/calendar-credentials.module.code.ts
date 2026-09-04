import {
  type GoogleOauthAppCredentials,
  readGoogleOauthAppCredentials,
} from "@akasha/google-oauth/oauth-app-credentials"
import { requireEnv } from "@akasha/utils-narrow/require-env"
import * as z from "zod"

export const CALENDAR_SCOPE = "https://www.googleapis.com/auth/calendar"

export const OWNER_CALENDAR_ID = "aawalton@gmail.com"

export const CALENDAR_OAUTH_SCOPE = "https://www.googleapis.com/auth/calendar.events"

export interface CalendarCredentials {
  readonly clientEmail: string
  readonly privateKey: string
}

export interface CalendarOauthCredentials extends GoogleOauthAppCredentials {
  readonly refreshToken: string
}

export function readCalendarCredentials(): CalendarCredentials {
  const clientEmail = requireEnv("GOOGLE_CALENDAR_SA_CLIENT_EMAIL")
  const privateKey = requireEnv("GOOGLE_CALENDAR_SA_PRIVATE_KEY").replaceAll("\\n", "\n")
  return { clientEmail, privateKey }
}

export function readCalendarOauthCredentials(): CalendarOauthCredentials {
  return {
    ...readGoogleOauthAppCredentials(),
    refreshToken: requireEnv("GOOGLE_CALENDAR_OAUTH_REFRESH_TOKEN"),
  }
}

export function readDefaultCalendarId(): string | undefined {
  const value = z.string().optional().parse(process.env.GOOGLE_CALENDAR_DEFAULT_CALENDAR_ID)
  if (value === undefined || value === "") return undefined
  return value
}
