import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaOceansIWantTomorrow = {
  id: "01a0a5b0-2c9b-77cd-9ce0-e348a8ad9eec",
  type: "page-type/track",
  slug: "enya-oceans-i-want-tomorrow",
  ownLength: 4.033333333333333,
  ownProgress: 0,
  partOfCollections: ["release/enya-oceans"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6Cjg8joJG3KVjy2LAWYFbo",
      externalLink: "https://open.spotify.com/track/6Cjg8joJG3KVjy2LAWYFbo",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "I Want Tomorrow",
} as const satisfies Track
