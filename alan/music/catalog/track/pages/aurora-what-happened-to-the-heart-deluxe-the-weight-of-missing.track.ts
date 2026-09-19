import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWhatHappenedToTheHeartDeluxeTheWeightOfMissing = {
  id: "01a0b637-ee0e-7ead-bb67-9eb7f8e2120f",
  type: "page-type/track",
  slug: "aurora-what-happened-to-the-heart-deluxe-the-weight-of-missing",
  ownLength: 6.580433333333334,
  ownProgress: 0,
  partOfCollections: ["release/aurora-what-happened-to-the-heart-deluxe"],
  position: 19,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1LilgVPWoXNIjBsE59UQ8L",
      externalLink: "https://open.spotify.com/track/1LilgVPWoXNIjBsE59UQ8L",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The Weight Of Missing",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "theweightofmissing|1WgXqy2Dd70QQOU7Ay074N|394826",
  song: "song/aurora-the-weight-of-missing",
} as const satisfies Track
