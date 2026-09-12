import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const musicChoosing = {
  id: "01a06281-4d9d-7000-8324-01f8e3c762a1",
  type: "domain",
  slug: "music-choosing",
  definition: "the choice of what Alan hears next",
  parts: [
    "module/music-exploration",
    "module/rating-ladder",
    "module/track-candidate",
    "module/track-resolving",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Spotify is reached only through the `spotify` domain.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a page.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here commands the player.",
    },
  ],
} as const satisfies Domain
