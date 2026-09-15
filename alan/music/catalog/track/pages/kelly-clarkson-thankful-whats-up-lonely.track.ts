import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonThankfulWhatsUpLonely = {
  id: "01a0a5ae-cd05-7115-9b26-2394cfc48566",
  type: "track",
  slug: "kelly-clarkson-thankful-whats-up-lonely",
  ownLength: 4.13955,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-thankful"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1ByHkumvEHingpIhElxzPf",
      externalLink: "https://open.spotify.com/track/1ByHkumvEHingpIhElxzPf",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "What's Up Lonely",
} as const satisfies Track
