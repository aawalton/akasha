import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraTheWomanIAmAcousticTheWomanIAmAcoustic = {
  id: "01a0b638-03a4-76e2-a42e-94c2c689700c",
  type: "page-type/track",
  slug: "aurora-the-woman-i-am-acoustic-the-woman-i-am-acoustic",
  ownLength: 3.513333333333333,
  ownProgress: 3.513333333333333,
  partOfCollections: ["release/aurora-the-woman-i-am-acoustic"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Woman I Am - Acoustic",
  trackType: "acoustic",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "thewomaniamacoustic|1WgXqy2Dd70QQOU7Ay074N|210800",
  song: "song/aurora-the-woman-i-am",
  carriedBy: [
    {
      release: "release/aurora-the-woman-i-am-acoustic",
      discNumber: 1,
      position: 1,
      externalId: "1bNpATzXUSB6N8xUhUtiWo",
      externalLink: "https://open.spotify.com/track/1bNpATzXUSB6N8xUhUtiWo",
    },
  ],
} as const satisfies Track
