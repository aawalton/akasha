import type { Module } from "@akasha/code-system/module"

export const claudeAccountOauth = {
  id: "01a0632e-cb60-74d1-a6d9-2f68882c142c",
  pageTypeSlug: "module",
  slug: "claude-account-oauth",
  definition: "the OAuth exchange an account's credentials and usage arrive over",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A token is refreshed at `https://platform.claude.com/v1/oauth/token`.",
    },
    {
      invariantKind: "departure",
      statement: "Usage is probed at `https://api.anthropic.com/api/oauth/usage`.",
    },
    {
      invariantKind: "departure",
      statement: "A profile is probed at `https://api.anthropic.com/api/oauth/profile`.",
    },
    {
      invariantKind: "departure",
      statement: "The OAuth client id is a constant rather than a value read from the environment.",
    },
    {
      invariantKind: "departure",
      statement: "The refresh buffer is five minutes.",
    },
    {
      invariantKind: "departure",
      statement: "A token expiring inside three hours is renewed by the upkeep.",
    },
    {
      invariantKind: "departure",
      statement: "The upkeep runs once an hour.",
    },
    {
      invariantKind: "departure",
      statement: "A token response names an access token that is not empty.",
    },
    {
      invariantKind: "departure",
      statement: "A token response names a refresh token that is not empty.",
    },
    {
      invariantKind: "departure",
      statement: "A token response names the seconds until that token expires.",
    },
    {
      invariantKind: "departure",
      statement: "A usage response names a five-hour window and a seven-day window.",
    },
    {
      invariantKind: "departure",
      statement: "A usage window names a utilization as a number.",
    },
    {
      invariantKind: "departure",
      statement: "A usage window names a reset key whose value may be null.",
    },
    {
      invariantKind: "departure",
      statement: "A profile response names an account uuid that is not empty.",
    },
    {
      invariantKind: "departure",
      statement: "A profile response names an email as an optional field.",
    },
    {
      invariantKind: "departure",
      statement: "A body carrying keys a wire shape does not name still parses.",
    },
    {
      invariantKind: "departure",
      statement: "A key a wire shape does not name is kept on the parsed value.",
    },
    {
      invariantKind: "departure",
      statement: "A wire shape refuses a number that is NaN.",
    },
    {
      invariantKind: "departure",
      statement: "A wire shape refuses a number that is infinite.",
    },
    {
      invariantKind: "departure",
      statement: "A status of 500 or above is classified as not terminal.",
    },
    {
      invariantKind: "departure",
      statement: "A status of 429 is classified with the code `rate_limited`.",
    },
    {
      invariantKind: "departure",
      statement: "The code `invalid_grant` is terminal.",
    },
    {
      invariantKind: "departure",
      statement: "The code `invalid_client` is terminal.",
    },
    {
      invariantKind: "departure",
      statement: "A code the terminal set does not name is not terminal.",
    },
    {
      invariantKind: "departure",
      statement: "A terminal classification needs a status from 400 through 499.",
    },
    {
      invariantKind: "departure",
      statement: "A body the JSON parser refuses is classified as not terminal.",
    },
    {
      invariantKind: "departure",
      statement: "A body carrying no OAuth error envelope is classified as not terminal.",
    },
    {
      invariantKind: "departure",
      statement: "An absent `error` key is classified with no code.",
    },
    {
      invariantKind: "departure",
      statement: "An absent `error_description` key is classified with no description.",
    },
    {
      invariantKind: "departure",
      statement: "A retry-allowed instant is the moment handed in plus a backoff.",
    },
    {
      invariantKind: "departure",
      statement: "A `Retry-After` of whole seconds sets the backoff in milliseconds.",
    },
    {
      invariantKind: "departure",
      statement: "A backoff read from `Retry-After` is capped at five hours.",
    },
    {
      invariantKind: "departure",
      statement: "A missing `Retry-After` backs off five seconds.",
    },
    {
      invariantKind: "departure",
      statement: "A blank `Retry-After` backs off the default instead.",
    },
    {
      invariantKind: "departure",
      statement: "A `Retry-After` of zero or less backs off the default instead.",
    },
    {
      invariantKind: "departure",
      statement: "A `Retry-After` the number parser refuses backs off the default instead.",
    },
    {
      invariantKind: "departure",
      statement: "A caller may hand in a backoff other than the default.",
    },
    {
      invariantKind: "departure",
      statement: "A gate with no attempt recorded allows a re-poll.",
    },
    {
      invariantKind: "departure",
      statement: "A re-poll inside sixty seconds of the last attempt is skipped.",
    },
    {
      invariantKind: "departure",
      statement: "A re-poll sixty seconds after the last attempt is allowed.",
    },
    {
      invariantKind: "departure",
      statement: "An open breaker skips a re-poll whatever the last attempt was.",
    },
    {
      invariantKind: "departure",
      statement: "A breaker opens for five minutes when usage answers a rate limit.",
    },
    {
      invariantKind: "departure",
      statement: "A breaker whose instant has arrived skips nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A breaker skip is decided before the minimum interval is read.",
    },
    {
      invariantKind: "departure",
      statement: "A recorded attempt moves the last attempt to the moment handed in.",
    },
    {
      invariantKind: "departure",
      statement: "A recorded rate limit moves the last attempt as a recorded attempt does.",
    },
    {
      invariantKind: "departure",
      statement: "A recorded attempt leaves the breaker instant unchanged.",
    },
    {
      invariantKind: "departure",
      statement: "A skip carries the whole seconds left rounded up.",
    },
    {
      invariantKind: "departure",
      statement: "A refresh outcome that worked carries the credential the refresh answered with.",
    },
    {
      invariantKind: "departure",
      statement: "A refresh outcome that failed says whether the failure is terminal.",
    },
    {
      invariantKind: "departure",
      statement: "A refresh outcome that failed names the sort of failure.",
    },
    {
      invariantKind: "departure",
      statement: "A refresh outcome that failed may carry the status the refresh met.",
    },
    {
      invariantKind: "constraint",
      statement: "Every instant this module works from is handed in by the caller.",
    },
    {
      invariantKind: "constraint",
      statement: "A caller holds the gate state between two decisions.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a clock.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here fetches.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads an index.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a token.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here holds the gate state a decision is read from.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a second account to answer about the account asked about.",
    },
    {
      invariantKind: "gap",
      statement: "The `Retry-After` parser here is spelled a second time in `server-error`.",
    },
    {
      invariantKind: "gap",
      statement: "A `Retry-After` holding an HTTP date backs off the default instead.",
    },
    {
      invariantKind: "gap",
      statement: "A skip reason is prose rather than a code a caller branches on.",
    },
    {
      invariantKind: "gap",
      statement: "The five-hour backoff cap is the threshold a stale at-limit mark is healed at.",
    },
    {
      invariantKind: "gap",
      statement:
        "An account met by a rate limit waits five minutes even where `Retry-After` says less.",
    },
    {
      invariantKind: "gap",
      statement: "A usage window's utilization is unbounded above.",
    },
    {
      invariantKind: "gap",
      statement:
        "A refresh outcome is declared here while the token refresh sits outside this module.",
    },
  ],
} as const satisfies Module
