import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraStoriesItHappenedQuiet = {
  id: "01a0b638-0761-7c11-88f6-f20e269b73b5",
  type: "page-type/track",
  slug: "aurora-stories-it-happened-quiet",
  ownLength: 4.151783333333333,
  ownProgress: 0,
  partOfCollections: ["release/aurora-stories"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "69ndwWhZqfsimvVor5eno0",
      externalLink: "https://open.spotify.com/track/69ndwWhZqfsimvVor5eno0",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "It Happened Quiet",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "ithappenedquiet|1WgXqy2Dd70QQOU7Ay074N|249107",
  song: "song/aurora-it-happened-quiet",
} as const satisfies Track
