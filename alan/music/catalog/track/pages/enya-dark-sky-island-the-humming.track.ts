import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaDarkSkyIslandTheHumming = {
  id: "01a0a5b0-0b07-7834-a083-f3a6a4e65e80",
  type: "track",
  slug: "enya-dark-sky-island-the-humming",
  ownLength: 3.752,
  ownProgress: 0,
  partOfCollections: ["release/enya-dark-sky-island"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "15Zt4Z0N6JMwyNp1vLQNfi",
      externalLink: "https://open.spotify.com/track/15Zt4Z0N6JMwyNp1vLQNfi",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "The Humming",
} as const satisfies Track
