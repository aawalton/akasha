import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWhatHappenedToTheHeartDreams = {
  id: "01a0b637-eff8-73f4-adcf-d9cf1b0cace6",
  type: "page-type/track",
  slug: "aurora-what-happened-to-the-heart-dreams",
  ownLength: 4.40155,
  ownProgress: 0,
  partOfCollections: ["release/aurora-what-happened-to-the-heart"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2B6p25DfeEkYYbpShv22b9",
      externalLink: "https://open.spotify.com/track/2B6p25DfeEkYYbpShv22b9",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Dreams",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "dreams|1WgXqy2Dd70QQOU7Ay074N|264093",
} as const satisfies Track
