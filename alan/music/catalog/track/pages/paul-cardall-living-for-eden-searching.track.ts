import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLivingForEdenSearching = {
  id: "01a0b4c8-4a1e-757b-aaf7-c03dc9f8167a",
  type: "page-type/track",
  slug: "paul-cardall-living-for-eden-searching",
  ownLength: 4.710216666666667,
  ownProgress: 4.710216666666667,
  partOfCollections: ["release/paul-cardall-living-for-eden"],
  status: "completed",
  unit: "unit/minutes",
  title: "Searching",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "searching|7FQRbf8gbKw8KZQZAJWxH2|282613",
  song: "song/paul-cardall-searching",
  carriedBy: [
    {
      release: "release/paul-cardall-living-for-eden",
      discNumber: 1,
      position: 8,
      externalId: "6KMagacF0iBTc922Go3u4f",
      externalLink: "https://open.spotify.com/track/6KMagacF0iBTc922Go3u4f",
    },
  ],
} as const satisfies Track
