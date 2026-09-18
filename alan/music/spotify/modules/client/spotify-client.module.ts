import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const spotifyClient = {
  id: "01a06261-dc1d-7007-8f9c-f19cb6de7402",
  type: "page-type/module",
  slug: "spotify-client",
  definition: "one paced queue every Spotify Web API call goes through",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Two calls are never in flight at once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A gap follows a call that answered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A gap follows a call that threw.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The gap is a hundred milliseconds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`SPOTIFY_RATE_LIMIT_MS` names the gap in milliseconds instead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The gap is read from the environment at every call rather than once at load.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A gap that is no positive whole number is read as the hundred milliseconds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A 429 names how long to wait in its `Retry-After` header.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A `Retry-After` other than a positive number is read as one second.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A wait over sixty seconds throws rather than blocking that long.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A 429 is retried once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A 401 forces one refresh and one retry.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A path opening with a scheme is called as the path is rather than under the base URL.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page's `next` link is followed until the link is null.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No Web API call is made outside the queue.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No answer is kept between calls.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refresh leaves the 429 retry already spent spent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Paging gives back no more items than the most it was asked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every read that pages follows `next` through this one module.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every query a path carries is written here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call takes a slot from the account's window before that call is made.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A call handed a fetching of its own reaches no live API, so that call takes no slot.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A 429 writes its refusal against the account, so every other process reads it.",
    },
  ],
} as const satisfies Module
