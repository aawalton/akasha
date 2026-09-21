import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const spotifyPlaylists = {
  id: "01a0c4ed-a8b0-7e8c-9703-45d944d791a6",
  type: "page-type/module",
  slug: "spotify-playlists",
  definition: "a playlist of Alan's made and filled over the Web API",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A playlist is made under the account the token is held for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every call here names the path Spotify carries now rather than one it deprecated.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Spotify refuses a deprecated playlist path at the edge, saying only `Forbidden`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A playlist made here is private.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track reaches a playlist as a uri rather than as an id.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "One call adds a hundred tracks at most.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "More tracks than one call holds are added over as many calls as it takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Tracks reach the playlist in the order they were handed over.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here chooses which tracks a playlist holds.",
    },
  ],
} as const satisfies Module
