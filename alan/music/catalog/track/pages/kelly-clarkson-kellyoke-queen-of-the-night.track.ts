import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonKellyokeQueenOfTheNight = {
  id: "01a0a5ae-d1ae-7fbf-8cee-2cce5f13d580",
  type: "page-type/track",
  slug: "kelly-clarkson-kellyoke-queen-of-the-night",
  ownLength: 3.1752,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-kellyoke"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5Q65ttW5DQ1MlJjuJ0yGVS",
      externalLink: "https://open.spotify.com/track/5Q65ttW5DQ1MlJjuJ0yGVS",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Queen of the Night",
} as const satisfies Track
