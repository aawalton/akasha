import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraThankUThankU = {
  id: "01a0b638-0bc6-72ef-a5e3-9f6ecf1b0ba2",
  type: "page-type/track",
  slug: "aurora-thank-u-thank-u",
  ownLength: 4.046216666666667,
  ownProgress: 0,
  partOfCollections: ["release/aurora-thank-u"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1w5J5CBuvT36kt2OtHa8ts",
      externalLink: "https://open.spotify.com/track/1w5J5CBuvT36kt2OtHa8ts",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Thank U",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "thanku|1WgXqy2Dd70QQOU7Ay074N|242773",
} as const satisfies Track
