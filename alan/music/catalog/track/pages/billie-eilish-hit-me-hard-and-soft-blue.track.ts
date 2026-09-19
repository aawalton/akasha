import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHitMeHardAndSoftBlue = {
  id: "01a0b638-e386-792f-9e5d-d2b2a01dff51",
  type: "page-type/track",
  slug: "billie-eilish-hit-me-hard-and-soft-blue",
  ownLength: 5.718666666666667,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-hit-me-hard-and-soft"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2prqm9sPLj10B4Wg0wE5x9",
      externalLink: "https://open.spotify.com/track/2prqm9sPLj10B4Wg0wE5x9",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "BLUE",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "blue|6qqNVTkY8uBg9cP3Jd7DAH|343120",
  song: "song/billie-eilish-blue",
} as const satisfies Track
