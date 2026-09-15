import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const alexWarrenYouLlBeAlrightKidOnMyMind = {
  id: "01a0a59d-cc38-7c8f-97cc-9eaa45648b0e",
  type: "track",
  slug: "alex-warren-you-ll-be-alright-kid-on-my-mind",
  ownLength: 3.159283333333333,
  ownProgress: 0,
  partOfCollections: ["release/alex-warren-you-ll-be-alright-kid"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3lTTI3ldcvCbvQDfz7I49R",
      externalLink: "https://open.spotify.com/track/3lTTI3ldcvCbvQDfz7I49R",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "On My Mind",
} as const satisfies Track
