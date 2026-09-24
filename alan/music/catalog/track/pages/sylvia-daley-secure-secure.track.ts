import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sylviaDaleySecureSecure = {
  id: "01a0a6c3-6da4-7ad1-a36d-b7aaed506317",
  type: "page-type/track",
  slug: "sylvia-daley-secure-secure",
  ownLength: 3.10795,
  ownProgress: 3.10795,
  partOfCollections: ["release/sylvia-daley-secure"],
  status: "completed",
  unit: "unit/minutes",
  title: "Secure",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sylvia-daley" }],
  trackKey: "secure|03dXd2zBbBJvX60Oap8Lgo|186477",
  song: "song/sylvia-daley-secure",
  carriedBy: [
    {
      release: "release/sylvia-daley-secure",
      discNumber: 1,
      position: 1,
      externalId: "66RIcMxYr824yGrWTFdwEo",
      externalLink: "https://open.spotify.com/track/66RIcMxYr824yGrWTFdwEo",
    },
  ],
} as const satisfies Track
