import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaTheCeltsTheCelts = {
  id: "01a0a5b0-2480-73ed-b979-ec7b0c708c32",
  type: "page-type/track",
  slug: "enya-the-celts-the-celts",
  ownLength: 2.966666666666667,
  ownProgress: 0,
  partOfCollections: ["release/enya-the-celts"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7BVJeVGFZdN7blBsSu3fUP",
      externalLink: "https://open.spotify.com/track/7BVJeVGFZdN7blBsSu3fUP",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "The Celts",
} as const satisfies Track
