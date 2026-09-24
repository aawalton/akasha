import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraTheWomanIAmAcousticTheWomanIAm = {
  id: "01a0b638-03ca-73dc-9905-d7fbb071964f",
  type: "page-type/track",
  slug: "aurora-the-woman-i-am-acoustic-the-woman-i-am",
  ownLength: 3.220666666666667,
  ownProgress: 3.220666666666667,
  partOfCollections: ["release/aurora-the-woman-i-am-acoustic", "release/aurora-the-woman-i-am"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Woman I Am",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "thewomaniam|1WgXqy2Dd70QQOU7Ay074N|193240",
  song: "song/aurora-the-woman-i-am",
  carriedBy: [
    {
      release: "release/aurora-the-woman-i-am",
      discNumber: 1,
      position: 1,
      externalId: "5bBrF5YvBYbEbnZxrmycab",
      externalLink: "https://open.spotify.com/track/5bBrF5YvBYbEbnZxrmycab",
    },
    {
      release: "release/aurora-the-woman-i-am-acoustic",
      discNumber: 1,
      position: 2,
      externalId: "2eaqmbJaG60MI32ca9aeIA",
      externalLink: "https://open.spotify.com/track/2eaqmbJaG60MI32ca9aeIA",
    },
  ],
} as const satisfies Track
