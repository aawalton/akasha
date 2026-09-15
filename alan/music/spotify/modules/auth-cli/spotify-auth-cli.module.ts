import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const spotifyAuthCli = {
  id: "01a06261-dc1d-700c-a56a-b1a6269144c7",
  type: "module",
  slug: "spotify-auth-cli",
  definition: "the two steps Alan takes at a terminal to authorise this client",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The first step prints a URL and saves a verifier.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The second step reads that verifier and trades the code for a token.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The verifier is taken away once the trade is done.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Alan copies the code off the callback page into the terminal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A second step run with no first step throws.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A challenge is the SHA-256 of the verifier in base64url.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No server listens for the callback here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run naming no step runs the first step.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The call each step names is the file running rather than a path spelled here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "Nothing compares the state the callback gives back, because Alan copies the code by hand.",
    },
  ],
} as const satisfies Module
