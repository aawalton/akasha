import type { Finding } from "../finding.page-type.ts"

export const oneGoogleConsentAppBehindThreePackages = {
  id: "01a05bdc-e25d-7ce7-928c-2e6770d63aaf",
  pageTypeSlug: "finding",
  slug: "one-google-consent-app-behind-three-packages",
  domainSlug: "domain/alan-harness",
  claim:
    "Three of Alan's Google packages spell the same two functions byte for byte: the parser of a consent callback URL and the reader of the OAuth app's client id and secret. Landing all three into akasha as they stand would have added six files for `no-rule-in-two-files` to refuse, a check another lane is already clearing 62 refusals of. I took the call to land the shared pair once, as `@akasha/google-oauth`, and have calendar, drive and mail each reach it.",
  evidence:
    "`alanwalton/calendar-google/src/oauth-callback.ts`, `alanwalton/drive-google/src/oauth-callback.ts` and `alanwalton/email-google/src/oauth-callback.ts` are byte-identical at 24 lines each, checked with `cmp`. `readCalendarOauthAppCredentials`, `readDriveOauthAppCredentials` and `readGmailOauthAppCredentials` differ only in their names and their return type's name: all three read `GOOGLE_GMAIL_OAUTH_CLIENT_ID` and `GOOGLE_GMAIL_OAUTH_CLIENT_SECRET`, and the help text on all three login commands already says the credential is shared with the Gmail OAuth app.\n\nWhat I did not extract: `makeAuthClient` in the calendar, drive and mail packages is also the same four lines modulo renaming, but each builds `auth.OAuth2` out of its own `@googleapis/*` package and hands the result to that package's own client factory. Unifying it means one nominal type carried through three packages, and the only way through is a cast that `no-double-cast` would then have something to say about. So three copies of that one stand, and `no-rule-in-two-files` may name them at audit.\n\nThis is a sixth package in a lane briefed for five. It holds nothing that was not already in the five, and it exists so the other lane's count falls rather than rises.",
} as const satisfies Finding
