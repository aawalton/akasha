import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWhatHappenedToTheHeartDeluxeDoYouFeel = {
  id: "01a0b637-ecfd-738e-bd53-8c6d6f6a5e04",
  type: "page-type/track",
  slug: "aurora-what-happened-to-the-heart-deluxe-do-you-feel",
  ownLength: 3.0251,
  ownProgress: 0,
  partOfCollections: ["release/aurora-what-happened-to-the-heart-deluxe"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0mgcVLtDeAzqqznnRbpUXw",
      externalLink: "https://open.spotify.com/track/0mgcVLtDeAzqqznnRbpUXw",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Do You Feel?",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "doyoufeel|1WgXqy2Dd70QQOU7Ay074N|181506",
  song: "song/aurora-do-you-feel",
} as const satisfies Track
