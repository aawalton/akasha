import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const spotifyPlaylists = {
  id: "01a0c4ed-a8b0-7e8c-9703-45d944d791a6",
  type: "page-type/module",
  slug: "spotify-playlists",
  definition: "a playlist of Alan's read and kept over the Web API",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A playlist is reached under the account the token is held for.",
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
      decisionKind: "decision-kind/absence",
      statement: "No playlist is made here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track reaches a playlist as a uri rather than as an id.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "One call carries a hundred tracks at most.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "More tracks than one call holds are carried over as many calls as it takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tracks a playlist holds are read a page at a time until no page is left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tracks a playlist holds are answered in the order the playlist holds them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Something a playlist holds that is no track is not answered for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track leaves a playlist as a uri, so every copy of that track leaves at once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Tracks reach the playlist in the order they were handed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A playlist written whole holds the tracks handed over and nothing it held before.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The first hundred of those tracks are written and the rest are added after.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here chooses which tracks a playlist holds.",
    },
  ],
} as const satisfies Module
