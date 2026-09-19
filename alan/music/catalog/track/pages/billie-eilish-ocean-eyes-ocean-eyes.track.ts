import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishOceanEyesOceanEyes = {
  id: "01a0b638-ee81-7607-9c58-44e228e0a3cc",
  type: "page-type/track",
  slug: "billie-eilish-ocean-eyes-ocean-eyes",
  ownLength: 3.3426666666666667,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-ocean-eyes"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2uIX8YMNjGMD7441kqyyNU",
      externalLink: "https://open.spotify.com/track/2uIX8YMNjGMD7441kqyyNU",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "ocean eyes",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "oceaneyes|6qqNVTkY8uBg9cP3Jd7DAH|200560",
  song: "song/billie-eilish-ocean-eyes",
} as const satisfies Track
