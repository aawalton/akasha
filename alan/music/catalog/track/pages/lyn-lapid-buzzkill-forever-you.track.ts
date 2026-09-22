import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const lynLapidBuzzkillForeverYou = {
  id: "01a0c95e-afca-7f6e-9cbb-86c0127f8c91",
  type: "page-type/track",
  slug: "lyn-lapid-buzzkill-forever-you",
  ownLength: 3.3168166666666665,
  ownProgress: 0,
  partOfCollections: ["release/lyn-lapid-buzzkill-forever"],
  status: "not-started",
  unit: "unit/minutes",
  title: "you",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "4pfy05cNNTacuOQ6SiSu4v", artistName: "Lyn Lapid" }],
  trackKey: "you|4pfy05cNNTacuOQ6SiSu4v|199009",
  song: "song/lyn-lapid-you",
  carriedBy: [
    {
      release: "release/lyn-lapid-buzzkill-forever",
      discNumber: 1,
      position: 16,
      externalId: "7z06Avp9qBO9SxEBQG5JzC",
      externalLink: "https://open.spotify.com/track/7z06Avp9qBO9SxEBQG5JzC",
    },
  ],
} as const satisfies Track
