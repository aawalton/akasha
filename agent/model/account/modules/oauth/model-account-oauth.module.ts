import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const modelAccountOauth = {
  id: "01a0632e-cb60-74d1-a6d9-2f68882c142c",
  type: "page-type/module",
  slug: "model-account-oauth",
  definition: "the OAuth exchange an account's credentials and usage arrive over",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A token is refreshed at `https://platform.claude.com/v1/oauth/token`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Usage is probed at `https://api.anthropic.com/api/oauth/usage`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A profile is probed at `https://api.anthropic.com/api/oauth/profile`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The OAuth client id is a constant rather than a value read from the environment.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The refresh buffer is five minutes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A token expiring inside three hours is renewed by the upkeep.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The upkeep runs once an hour.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A token response names an access token that is not empty.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A token response names a refresh token that is not empty.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A token response names the seconds until that token expires.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A usage response names a five-hour window and a seven-day window.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A usage window names a utilization as a number.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A usage window names a reset key whose value may be null.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A profile response names an account uuid that is not empty.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A profile response names an email as an optional field.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body with keys a wire shape does not name still parses.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key a wire shape does not name is kept on the parsed value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A wire shape refuses a number that is NaN.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A wire shape refuses a number that is infinite.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A status of 500 or above is classified as not terminal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A status of 429 is classified with the code `rate_limited`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The code `invalid_grant` is terminal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The code `invalid_client` is terminal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A code the terminal set does not name is not terminal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A terminal classification needs a status from 400 through 499.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body the JSON parser refuses is classified as not terminal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body with no OAuth error envelope is classified as not terminal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An absent `error` key is classified with no code.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An absent `error_description` key is classified with no description.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A retry-allowed instant is the moment handed in plus a backoff.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A `Retry-After` of whole seconds sets the backoff in milliseconds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A backoff read from `Retry-After` is capped at five hours.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A missing `Retry-After` backs off five seconds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A blank `Retry-After` backs off the default instead.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A `Retry-After` no greater than zero backs off the default instead.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A `Retry-After` the number parser refuses backs off the default instead.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller may hand in a backoff other than the default.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A gate with no attempt recorded allows a re-poll.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A re-poll inside sixty seconds of the last attempt is skipped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A re-poll sixty seconds after the last attempt is allowed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An open breaker skips a re-poll whatever the last attempt was.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A breaker opens for five minutes when usage answers a rate limit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A breaker whose instant has arrived skips nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A breaker skip is decided before the minimum interval is read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A recorded attempt moves the last attempt to the moment handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A recorded rate limit moves the last attempt as a recorded attempt does.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A recorded attempt leaves the breaker instant unchanged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A skip has the whole seconds left rounded up.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refresh outcome that worked has the credential the refresh answered with.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refresh outcome that failed says whether the failure is terminal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refresh outcome that failed names the sort of failure.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refresh outcome that failed may have the status the refresh met.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Every instant this module works from is handed in by the caller.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A caller has the gate state between two decisions.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a clock.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here fetches.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a file.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads an index.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes a token.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here holds the gate state a decision is read from.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a second account to answer about the account asked about.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A `Retry-After` holding an HTTP date backs off the default instead.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A skip reason is prose rather than a code a caller branches on.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement:
        "An account met by a rate limit waits five minutes even where `Retry-After` says a shorter wait.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A usage window's utilization is unbounded above.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement:
        "A refresh outcome is declared here while the token refresh sits outside this module.",
    },
  ],
} as const satisfies Module
