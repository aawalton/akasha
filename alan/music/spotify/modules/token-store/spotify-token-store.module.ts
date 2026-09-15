import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const spotifyTokenStore = {
  id: "01a06261-dc1d-7003-91e1-246d336ed495",
  type: "page-type/module",
  slug: "spotify-token-store",
  definition: "the access token and refresh token kept between runs",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The token file is named `token.json`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`SPOTIFY_TOKEN_FILE` names the token file instead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The environment is read at every call rather than once at load.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A token has an access token.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A token has a refresh token.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A token has an expiry.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A token has the scopes the token was given.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A token with anything else is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An expiry is written as an ISO instant.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here asks Spotify for a token.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here judges whether a token is expired.",
    },
    { decisionKind: "decision-kind/absence", statement: "Nothing here takes a token away." },
  ],
} as const satisfies Module
