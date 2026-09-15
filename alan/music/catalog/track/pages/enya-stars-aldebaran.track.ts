import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaStarsAldebaran = {
  id: "01a0a5b0-1762-7234-8522-5a62154cf98d",
  type: "track",
  slug: "enya-stars-aldebaran",
  ownLength: 3.0933333333333333,
  ownProgress: 0,
  partOfCollections: ["release/enya-stars"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7tUHU0HT6Aq1iNWsHLC1s7",
      externalLink: "https://open.spotify.com/track/7tUHU0HT6Aq1iNWsHLC1s7",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Aldebaran",
} as const satisfies Track
