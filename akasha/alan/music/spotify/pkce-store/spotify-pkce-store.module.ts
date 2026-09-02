import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const spotifyPkceStore = {
  id: "01a06261-dc1d-7004-9cf8-e12c3dded39e",
  pageTypeSlug: "module",
  slug: "spotify-pkce-store",
  definition: "the verifier and state carried between the consent step and the exchange step",
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
      statement: "A handoff carries a verifier and a state.",
    },
    {
      invariantKind: "departure",
      statement: "A handoff carrying anything else is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The handoff is taken away once the code is exchanged.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here creates a verifier.",
    },
  ],
} as const satisfies Module
