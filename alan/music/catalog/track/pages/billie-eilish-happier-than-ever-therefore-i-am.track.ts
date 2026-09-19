import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHappierThanEverThereforeIAm = {
  id: "01a0b638-e589-7319-acc7-dbea845351e4",
  type: "page-type/track",
  slug: "billie-eilish-happier-than-ever-therefore-i-am",
  ownLength: 2.892316666666667,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-happier-than-ever"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "20R4HfKloPKgXDqU7UKk3x",
      externalLink: "https://open.spotify.com/track/20R4HfKloPKgXDqU7UKk3x",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Therefore I Am",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "thereforeiam|6qqNVTkY8uBg9cP3Jd7DAH|173539",
  song: "song/billie-eilish-therefore-i-am",
} as const satisfies Track
