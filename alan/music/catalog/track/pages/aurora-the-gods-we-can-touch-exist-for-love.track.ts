import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraTheGodsWeCanTouchExistForLove = {
  id: "01a0b637-f4a2-7ee5-baec-161d52f63405",
  type: "page-type/track",
  slug: "aurora-the-gods-we-can-touch-exist-for-love",
  ownLength: 4.2119333333333335,
  ownProgress: 0,
  partOfCollections: ["release/aurora-the-gods-we-can-touch"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "09fAL7YwPV3YzVmQDzLY8d",
      externalLink: "https://open.spotify.com/track/09fAL7YwPV3YzVmQDzLY8d",
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
