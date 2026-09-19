import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraTheWomanIAmAcousticTheWomanIAmAcoustic = {
  id: "01a0b638-03a4-76e2-a42e-94c2c689700c",
  type: "page-type/track",
  slug: "aurora-the-woman-i-am-acoustic-the-woman-i-am-acoustic",
  ownLength: 3.513333333333333,
  ownProgress: 0,
  partOfCollections: ["release/aurora-the-woman-i-am-acoustic"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1bNpATzXUSB6N8xUhUtiWo",
      externalLink: "https://open.spotify.com/track/1bNpATzXUSB6N8xUhUtiWo",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The Woman I Am - Acoustic",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "thewomaniamacoustic|1WgXqy2Dd70QQOU7Ay074N|210800",
  song: "song/aurora-the-woman-i-am",
} as const satisfies Track
