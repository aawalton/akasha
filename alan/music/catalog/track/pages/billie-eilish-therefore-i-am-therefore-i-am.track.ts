import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishThereforeIAmThereforeIAm = {
  id: "01a0b638-e99f-78fa-80a1-bf1280363df8",
  type: "page-type/track",
  slug: "billie-eilish-therefore-i-am-therefore-i-am",
  ownLength: 2.90535,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-therefore-i-am"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "54bFM56PmE4YLRnqpW6Tha",
      externalLink: "https://open.spotify.com/track/54bFM56PmE4YLRnqpW6Tha",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Therefore I Am",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "thereforeiam|6qqNVTkY8uBg9cP3Jd7DAH|174321",
  song: "song/billie-eilish-therefore-i-am",
} as const satisfies Track
