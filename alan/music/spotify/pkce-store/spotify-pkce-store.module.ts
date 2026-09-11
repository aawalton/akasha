import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const spotifyPkceStore = {
  id: "01a06261-dc1d-7004-9cf8-e12c3dded39e",
  type: "module",
  slug: "spotify-pkce-store",
  definition: "the verifier carried between the consent step and the exchange step",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The handoff file is named `pkce.json`.",
    },
    {
      invariantKind: "departure",
      statement: "`SPOTIFY_PKCE_FILE` names the handoff file instead.",
    },
    {
      invariantKind: "departure",
      statement: "The handoff file sits beside the token file.",
    },
    {
      invariantKind: "departure",
      statement: "A handoff has a verifier.",
    },
    {
      invariantKind: "departure",
      statement: "A handoff with anything else is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The handoff is taken away once the code is exchanged.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here creates a verifier.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here keeps the state the authorize URL carries.",
    },
  ],
} as const satisfies Module
