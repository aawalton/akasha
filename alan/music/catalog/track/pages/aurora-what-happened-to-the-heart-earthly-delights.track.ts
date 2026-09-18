import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWhatHappenedToTheHeartEarthlyDelights = {
  id: "01a0b637-ef79-7d17-b856-33c59b325a2e",
  type: "page-type/track",
  slug: "aurora-what-happened-to-the-heart-earthly-delights",
  ownLength: 3.3533333333333335,
  ownProgress: 0,
  partOfCollections: ["release/aurora-what-happened-to-the-heart"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "20c50cPpuuf6aSmvRTX8Ep",
      externalLink: "https://open.spotify.com/track/20c50cPpuuf6aSmvRTX8Ep",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Earthly Delights",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "earthlydelights|1WgXqy2Dd70QQOU7Ay074N|201200",
} as const satisfies Track
