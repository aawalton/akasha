import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const spotifyAuth = {
  id: "01a06261-dc1d-7006-a47d-60926a2515c8",
  pageTypeSlug: "module",
  slug: "spotify-auth",
  definition: "an access token good right now, refreshed when it is not",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A token within sixty seconds of expiry is treated as expired.",
    },
    {
      invariantKind: "departure",
      statement: "A token answer naming no refresh token leaves the stored refresh token in place.",
    },
    {
      invariantKind: "departure",
      statement: "A refresh answering with no refresh token at all throws.",
    },
    {
      invariantKind: "departure",
      statement: "A token answer naming no scope leaves the stored scopes in place.",
    },
    {
      invariantKind: "departure",
      statement: "An expiry is written as an instant rather than as seconds remaining.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every refreshed token is written to the token store before the token is given back.",
    },
    {
      invariantKind: "departure",
      statement: "No stored token throws and names the consent command.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here asks Alan for consent.",
    },
  ],
} as const satisfies Module
