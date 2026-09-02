import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const spotifyAuthCli = {
  id: "01a06261-dc1d-700c-a56a-b1a6269144c7",
  pageTypeSlug: "module",
  slug: "spotify-auth-cli",
  definition: "the two steps Alan takes at a terminal to authorise this client",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The first step prints a URL and saves a verifier.",
    },
    {
      invariantKind: "departure",
      statement: "The second step reads that verifier and trades the code for a token.",
    },
    {
      invariantKind: "departure",
      statement: "The verifier is taken away once the trade is done.",
    },
    {
      invariantKind: "departure",
      statement: "Alan copies the code off the callback page into the terminal.",
    },
    {
      invariantKind: "departure",
      statement: "A second step run with no first step throws.",
    },
    {
      invariantKind: "departure",
      statement: "A challenge is the SHA-256 of the verifier in base64url.",
    },
    {
      invariantKind: "absence",
      statement: "No server listens for the callback here.",
    },
  ],
} as const satisfies Module
