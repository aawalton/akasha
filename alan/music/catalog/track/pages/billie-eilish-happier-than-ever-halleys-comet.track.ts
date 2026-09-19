import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHappierThanEverHalleysComet = {
  id: "01a0b638-e4a2-7fcf-bcda-e9dc0c56d208",
  type: "page-type/track",
  slug: "billie-eilish-happier-than-ever-halleys-comet",
  ownLength: 3.9126833333333333,
  ownProgress: 0,
  partOfCollections: ["release/billie-eilish-happier-than-ever"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5XsAal7ZcWg1I5T4NcRjkv",
      externalLink: "https://open.spotify.com/track/5XsAal7ZcWg1I5T4NcRjkv",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Halley's Comet",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6qqNVTkY8uBg9cP3Jd7DAH", artistName: "Billie Eilish" }],
  trackKey: "halleyscomet|6qqNVTkY8uBg9cP3Jd7DAH|234761",
  song: "song/billie-eilish-halley-s-comet",
} as const satisfies Track
