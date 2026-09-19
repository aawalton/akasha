import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWhatHappenedToTheHeartDeluxeEarthlyDelights = {
  id: "01a0b637-ec46-717a-ae19-aab779b1ed0b",
  type: "page-type/track",
  slug: "aurora-what-happened-to-the-heart-deluxe-earthly-delights",
  ownLength: 3.3533333333333335,
  ownProgress: 0,
  partOfCollections: ["release/aurora-what-happened-to-the-heart-deluxe"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1kk0xrPI07ZZMMNHINlKJj",
      externalLink: "https://open.spotify.com/track/1kk0xrPI07ZZMMNHINlKJj",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Earthly Delights",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "earthlydelights|1WgXqy2Dd70QQOU7Ay074N|201200",
  song: "song/aurora-earthly-delights",
} as const satisfies Track
