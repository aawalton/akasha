import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const lynLapidBuzzkillForeverCoraline = {
  id: "01a0c95e-ba2a-7b5b-b7b1-8f90fd729cda",
  type: "page-type/track",
  slug: "lyn-lapid-buzzkill-forever-coraline",
  ownLength: 2.816883333333333,
  ownProgress: 2.816883333333333,
  partOfCollections: [
    "release/lyn-lapid-buzzkill-forever",
    "release/lyn-lapid-buzzkill",
    "release/lyn-lapid-coraline",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "coraline",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "4pfy05cNNTacuOQ6SiSu4v", artistName: "Lyn Lapid" }],
  trackKey: "coraline|4pfy05cNNTacuOQ6SiSu4v|169013",
  song: "song/lyn-lapid-coraline",
  carriedBy: [
    {
      release: "release/lyn-lapid-buzzkill",
      discNumber: 1,
      position: 2,
      externalId: "4j4ejrv8Njm25yzjzmJnFb",
      externalLink: "https://open.spotify.com/track/4j4ejrv8Njm25yzjzmJnFb",
    },
    {
      release: "release/lyn-lapid-buzzkill-forever",
      discNumber: 1,
      position: 2,
      externalId: "0kLkz2kdMu4V592jHQmCre",
      externalLink: "https://open.spotify.com/track/0kLkz2kdMu4V592jHQmCre",
    },
    {
      release: "release/lyn-lapid-coraline",
      discNumber: 1,
      position: 1,
      externalId: "35UnweHI2mOrBbIIlYNClF",
      externalLink: "https://open.spotify.com/track/35UnweHI2mOrBbIIlYNClF",
    },
  ],
} as const satisfies Track
