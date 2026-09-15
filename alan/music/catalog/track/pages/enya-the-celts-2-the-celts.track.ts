import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaTheCelts2TheCelts = {
  id: "01a0a5b0-200c-7d91-8ac2-14639c8c92f3",
  type: "page-type/track",
  slug: "enya-the-celts-2-the-celts",
  ownLength: 2.9593333333333334,
  ownProgress: 0,
  partOfCollections: ["release/enya-the-celts-2"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1Q8VcLmEVRBtTaTs82clnS",
      externalLink: "https://open.spotify.com/track/1Q8VcLmEVRBtTaTs82clnS",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "The Celts",
} as const satisfies Track
