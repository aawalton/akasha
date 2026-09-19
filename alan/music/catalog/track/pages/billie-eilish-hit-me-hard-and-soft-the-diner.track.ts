import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHitMeHardAndSoftTheDiner = {
  id: "01a0b638-e337-765f-a7a5-a6e439e404d8",
  type: "page-type/track",
  slug: "billie-eilish-hit-me-hard-and-soft-the-diner",
  ownLength: 3.105766666666667,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-hit-me-hard-and-soft"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1LLUoftvmTjVNBHZoQyveF",
      externalLink: "https://open.spotify.com/track/1LLUoftvmTjVNBHZoQyveF",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "THE DINER",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "thediner|6qqNVTkY8uBg9cP3Jd7DAH|186346",
  song: "song/billie-eilish-the-diner",
} as const satisfies Track
