import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const lynLapidInMyMindItsyBitsy = {
  id: "01a0c95e-c567-7e37-8a26-7e11aa09205f",
  type: "page-type/track",
  slug: "lyn-lapid-in-my-mind-itsy-bitsy",
  ownLength: 2.9502166666666665,
  ownProgress: 2.9502166666666665,
  partOfCollections: ["release/lyn-lapid-in-my-mind", "release/lyn-lapid-itsy-bitsy"],
  status: "completed",
  unit: "unit/minutes",
  title: "Itsy Bitsy",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "4pfy05cNNTacuOQ6SiSu4v", artistName: "Lyn Lapid" }],
  trackKey: "itsybitsy|4pfy05cNNTacuOQ6SiSu4v|177013",
  song: "song/lyn-lapid-itsy-bitsy",
  carriedBy: [
    {
      release: "release/lyn-lapid-in-my-mind",
      discNumber: 1,
      position: 4,
      externalId: "4G7CtqZX8AF423DeaCtHMi",
      externalLink: "https://open.spotify.com/track/4G7CtqZX8AF423DeaCtHMi",
    },
    {
      release: "release/lyn-lapid-itsy-bitsy",
      discNumber: 1,
      position: 1,
      externalId: "1tXKuzYRdQsKa32ZUPiq0A",
      externalLink: "https://open.spotify.com/track/1tXKuzYRdQsKa32ZUPiq0A",
    },
  ],
} as const satisfies Track
