import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarsson1Rooftop = {
  id: "01a0aa7c-3467-7e2c-a5b8-0c6a3b3c7f5a",
  type: "page-type/track",
  slug: "zara-larsson-1-rooftop",
  ownLength: 3.9896333333333334,
  ownProgress: 3.9896333333333334,
  partOfCollections: ["release/zara-larsson-1"],
  status: "completed",
  unit: "unit/minutes",
  title: "Rooftop",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "rooftop|1Xylc3o4UrD53lo9CvFvVg|239378",
  song: "song/zara-larsson-rooftop",
  carriedBy: [
    {
      release: "release/zara-larsson-1",
      discNumber: 1,
      position: 3,
      externalId: "3dxnBkhHVokELZtzNTgvjc",
      externalLink: "https://open.spotify.com/track/3dxnBkhHVokELZtzNTgvjc",
    },
  ],
} as const satisfies Track
