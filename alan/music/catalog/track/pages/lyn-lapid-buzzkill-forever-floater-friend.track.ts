import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const lynLapidBuzzkillForeverFloaterFriend = {
  id: "01a0c95e-b0f3-7652-bc5d-8105f4763e9c",
  type: "page-type/track",
  slug: "lyn-lapid-buzzkill-forever-floater-friend",
  ownLength: 3.3733333333333335,
  ownProgress: 0,
  partOfCollections: ["release/lyn-lapid-buzzkill-forever", "release/lyn-lapid-buzzkill"],
  status: "not-started",
  unit: "unit/minutes",
  title: "floater friend",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "4pfy05cNNTacuOQ6SiSu4v", artistName: "Lyn Lapid" }],
  trackKey: "floaterfriend|4pfy05cNNTacuOQ6SiSu4v|202400",
  song: "song/lyn-lapid-floater-friend",
  carriedBy: [
    {
      release: "release/lyn-lapid-buzzkill",
      discNumber: 1,
      position: 5,
      externalId: "3qRaEXH9mZSfNjQMDq3KKC",
      externalLink: "https://open.spotify.com/track/3qRaEXH9mZSfNjQMDq3KKC",
    },
    {
      release: "release/lyn-lapid-buzzkill-forever",
      discNumber: 1,
      position: 5,
      externalId: "4UJOUiWya43HDOga0x6nDh",
      externalLink: "https://open.spotify.com/track/4UJOUiWya43HDOga0x6nDh",
    },
  ],
} as const satisfies Track
