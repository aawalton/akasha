import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const musicChoosing = {
  id: "01a06281-4d9d-7000-8324-01f8e3c762a1",
  type: "page-type/domain",
  slug: "music-choosing",
  definition: "how Alan's next song is chosen",
  parts: [
    "module/music-exploration",
    "module/track-candidate",
    "module/track-resolving",
    "module/unheard-picking",
    "module/playlist-reconciling",
    "page-type/playlist",
    "module/track-picking",
    "module/ungraded-picking",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Spotify is reached only through the `spotify` domain.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No module here writes a page.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here commands the player.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A Spotify playlist holds the music Alan has not heard by the artists Alan follows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A second Spotify playlist holds the music Alan has heard and not graded by those artists.",
    },
  ],
} as const satisfies Domain
