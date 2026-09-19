import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWhatHappenedToTheHeartDoYouFeel = {
  id: "01a0b637-f04b-715d-b79f-887ece9fce70",
  type: "page-type/track",
  slug: "aurora-what-happened-to-the-heart-do-you-feel",
  ownLength: 3.0251,
  ownProgress: 0,
  partOfCollections: ["release/aurora-what-happened-to-the-heart"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6vAT53Wp20Q11vpUypcT7h",
      externalLink: "https://open.spotify.com/track/6vAT53Wp20Q11vpUypcT7h",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Do You Feel?",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "doyoufeel|1WgXqy2Dd70QQOU7Ay074N|181506",
  song: "song/aurora-do-you-feel",
} as const satisfies Track
