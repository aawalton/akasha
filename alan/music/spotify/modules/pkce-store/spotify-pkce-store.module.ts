import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const spotifyPkceStore = {
  id: "01a06261-dc1d-7004-9cf8-e12c3dded39e",
  type: "module",
  slug: "spotify-pkce-store",
  definition: "the verifier carried between the consent step and the exchange step",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The handoff file is named `pkce.json`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`SPOTIFY_PKCE_FILE` names the handoff file instead.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The handoff file sits beside the token file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A handoff has a verifier.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A handoff with anything else is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The handoff is taken away once the code is exchanged.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here creates a verifier.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here keeps the state the authorize URL carries.",
    },
  ],
} as const satisfies Module
