import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const musicChoosing = {
  id: "01a06281-4d9d-7000-8324-01f8e3c762a1",
  type: "page-type/domain",
  slug: "music-choosing",
  definition: "the choice of what Alan hears next",
  parts: [
    "module/music-exploration",
    "module/rating-ladder",
    "module/track-candidate",
    "module/track-resolving",
    "module/unheard-picking",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Spotify is reached only through the `spotify` domain.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a page.",
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
  ],
} as const satisfies Domain
