import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const spotifyAuthCli = {
  id: "01a06261-dc1d-700c-a56a-b1a6269144c7",
  type: "page-type/module",
  slug: "spotify-auth-cli",
  definition: "what Alan runs at a terminal to authorise this client",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A run prints a URL and saves a verifier.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A callback reaching a loopback address is caught by a server this run opens.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run that caught the callback trades the code itself and Alan copies nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That server answers the one path the callback names and closes on the answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A callback coming back under another state is refused rather than traded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A callback reaching anywhere else leaves the code for Alan to hand to a second run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A loopback address is http at 127.0.0.1 or localhost, naming a port.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The trade reads the saved verifier and trades the code for a token.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The verifier is taken away once the trade is done.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A trade run with no verifier saved throws.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A challenge is the SHA-256 of the verifier in base64url.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run naming no step asks for consent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The call each step names is the file running rather than a path spelled here.",
    },
  ],
} as const satisfies Module
