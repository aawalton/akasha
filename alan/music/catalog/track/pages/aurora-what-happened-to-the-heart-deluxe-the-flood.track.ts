import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWhatHappenedToTheHeartDeluxeTheFlood = {
  id: "01a0b637-edc1-79c9-8614-14054def4e16",
  type: "page-type/track",
  slug: "aurora-what-happened-to-the-heart-deluxe-the-flood",
  ownLength: 4.495333333333333,
  ownProgress: 0,
  partOfCollections: ["release/aurora-what-happened-to-the-heart-deluxe"],
  position: 17,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2WxFBMZAyinR4y9s1MbRRn",
      externalLink: "https://open.spotify.com/track/2WxFBMZAyinR4y9s1MbRRn",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The Flood",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "theflood|1WgXqy2Dd70QQOU7Ay074N|269720",
} as const satisfies Track
