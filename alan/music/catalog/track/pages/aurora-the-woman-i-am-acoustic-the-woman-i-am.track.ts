import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraTheWomanIAmAcousticTheWomanIAm = {
  id: "01a0b638-03ca-73dc-9905-d7fbb071964f",
  type: "page-type/track",
  slug: "aurora-the-woman-i-am-acoustic-the-woman-i-am",
  ownLength: 3.220666666666667,
  ownProgress: 0,
  partOfCollections: ["release/aurora-the-woman-i-am-acoustic"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2eaqmbJaG60MI32ca9aeIA",
      externalLink: "https://open.spotify.com/track/2eaqmbJaG60MI32ca9aeIA",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The Woman I Am",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "thewomaniam|1WgXqy2Dd70QQOU7Ay074N|193240",
} as const satisfies Track
