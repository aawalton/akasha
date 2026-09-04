import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const spotifyClient = {
  id: "01a06261-dc1d-7007-8f9c-f19cb6de7402",
  pageTypeSlug: "module",
  slug: "spotify-client",
  definition: "one paced queue every Spotify Web API call goes through",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "An unpaced sweep of the Web API bans the account for about a day.",
    },
    {
      invariantKind: "departure",
      statement: "Two calls are never in flight at once.",
    },
    {
      invariantKind: "departure",
      statement: "A gap follows a call that answered.",
    },
    {
      invariantKind: "departure",
      statement: "A gap follows a call that threw.",
    },
    {
      invariantKind: "departure",
      statement: "The gap is a hundred milliseconds.",
    },
    {
      invariantKind: "departure",
      statement: "`SPOTIFY_RATE_LIMIT_MS` names the gap in milliseconds instead.",
    },
    {
      invariantKind: "departure",
      statement: "The gap is read from the environment at every call rather than once at load.",
    },
    {
      invariantKind: "departure",
      statement: "A gap that is no positive whole number is read as the hundred milliseconds.",
    },
    {
      invariantKind: "departure",
      statement: "A 429 names how long to wait in its `Retry-After` header.",
    },
    {
      invariantKind: "departure",
      statement: "A `Retry-After` that is no positive number is read as one second.",
    },
    {
      invariantKind: "departure",
      statement: "A wait over sixty seconds throws rather than blocking that long.",
    },
    {
      invariantKind: "departure",
      statement: "A 429 is retried once.",
    },
    {
      invariantKind: "departure",
      statement: "A 401 forces one refresh and one retry.",
    },
    {
      invariantKind: "departure",
      statement: "A path opening with a scheme is called as it is rather than under the base URL.",
    },
    {
      invariantKind: "departure",
      statement: "A page's `next` link is followed until the link is null.",
    },
    {
      invariantKind: "absence",
      statement: "No call is made outside the queue.",
    },
    {
      invariantKind: "absence",
      statement: "No answer is kept between calls.",
    },
  ],
} as const satisfies Module
