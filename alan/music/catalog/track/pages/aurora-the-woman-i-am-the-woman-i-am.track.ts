import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraTheWomanIAmTheWomanIAm = {
  id: "01a0b638-03f4-7daf-b423-7640d46c48ca",
  type: "page-type/track",
  slug: "aurora-the-woman-i-am-the-woman-i-am",
  ownLength: 3.220666666666667,
  ownProgress: 0,
  partOfCollections: ["release/aurora-the-woman-i-am"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5bBrF5YvBYbEbnZxrmycab",
      externalLink: "https://open.spotify.com/track/5bBrF5YvBYbEbnZxrmycab",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The Woman I Am",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "thewomaniam|1WgXqy2Dd70QQOU7Ay074N|193240",
  song: "song/aurora-the-woman-i-am",
} as const satisfies Track
