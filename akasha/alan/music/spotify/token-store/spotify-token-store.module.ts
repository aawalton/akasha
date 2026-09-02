import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const spotifyTokenStore = {
  id: "01a06261-dc1d-7003-91e1-246d336ed495",
  pageTypeSlug: "module",
  slug: "spotify-token-store",
  definition: "the access token and refresh token kept between runs",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The token file is named `token.json`.",
    },
    {
      invariantKind: "departure",
      statement: "`SPOTIFY_TOKEN_FILE` names the token file instead.",
    },
    {
      invariantKind: "departure",
      statement: "The environment is read at every call rather than once at load.",
    },
    {
      invariantKind: "departure",
      statement: "A token carries an access token.",
    },
    {
      invariantKind: "departure",
      statement: "A token carries a refresh token.",
    },
    {
      invariantKind: "departure",
      statement: "A token carries an expiry.",
    },
    {
      invariantKind: "departure",
      statement: "A token carries the scopes the token was given.",
    },
    {
      invariantKind: "departure",
      statement: "A token carrying anything else is refused.",
    },
    {
      invariantKind: "departure",
      statement: "An expiry is written as an ISO instant.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here asks Spotify for a token.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges whether a token is expired.",
    },
  ],
} as const satisfies Module
