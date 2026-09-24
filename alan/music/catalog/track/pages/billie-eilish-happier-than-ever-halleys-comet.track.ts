import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const billieEilishHappierThanEverHalleysComet = {
  id: "01a0b638-e4a2-7fcf-bcda-e9dc0c56d208",
  type: "page-type/track",
  slug: "billie-eilish-happier-than-ever-halleys-comet",
  ownLength: 3.9126833333333333,
  ownProgress: 3.9126833333333333,
  partOfCollections: ["release/billie-eilish-happier-than-ever"],
  status: "completed",
  unit: "unit/minutes",
  title: "Halley's Comet",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/billie-eilish" }],
  trackKey: "halleyscomet|6qqNVTkY8uBg9cP3Jd7DAH|234761",
  song: "song/billie-eilish-halley-s-comet",
  carriedBy: [
    {
      release: "release/billie-eilish-happier-than-ever",
      discNumber: 1,
      position: 8,
      externalId: "5XsAal7ZcWg1I5T4NcRjkv",
      externalLink: "https://open.spotify.com/track/5XsAal7ZcWg1I5T4NcRjkv",
    },
  ],
} as const satisfies Track
