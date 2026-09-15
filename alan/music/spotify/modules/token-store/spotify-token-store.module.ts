import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const spotifyTokenStore = {
  id: "01a06261-dc1d-7003-91e1-246d336ed495",
  type: "module",
  slug: "spotify-token-store",
  definition: "the access token and refresh token kept between runs",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The token file is named `token.json`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`SPOTIFY_TOKEN_FILE` names the token file instead.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The environment is read at every call rather than once at load.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A token has an access token.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A token has a refresh token.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A token has an expiry.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A token has the scopes the token was given.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A token with anything else is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An expiry is written as an ISO instant.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here asks Spotify for a token.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here judges whether a token is expired.",
    },
    { invariantKind: "invariant-kind/absence", statement: "Nothing here takes a token away." },
  ],
} as const satisfies Module
