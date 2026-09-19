import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraStoriesExistForLove = {
  id: "01a0b638-078c-7220-a941-5b161451a6a9",
  type: "page-type/track",
  slug: "aurora-stories-exist-for-love",
  ownLength: 4.2119333333333335,
  ownProgress: 0,
  partOfCollections: ["release/aurora-stories"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "264Ergl5lZRFw9vhuhGgHj",
      externalLink: "https://open.spotify.com/track/264Ergl5lZRFw9vhuhGgHj",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Exist for Love",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "existforlove|1WgXqy2Dd70QQOU7Ay074N|252716",
  song: "song/aurora-exist-for-love",
} as const satisfies Track
