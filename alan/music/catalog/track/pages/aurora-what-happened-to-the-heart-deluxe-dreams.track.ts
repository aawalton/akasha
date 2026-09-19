import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWhatHappenedToTheHeartDeluxeDreams = {
  id: "01a0b637-ecb0-777e-a88d-976194a5533e",
  type: "page-type/track",
  slug: "aurora-what-happened-to-the-heart-deluxe-dreams",
  ownLength: 4.40155,
  ownProgress: 0,
  partOfCollections: ["release/aurora-what-happened-to-the-heart-deluxe"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "64WS2f2lhljBYxiRcYQd2R",
      externalLink: "https://open.spotify.com/track/64WS2f2lhljBYxiRcYQd2R",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Dreams",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "dreams|1WgXqy2Dd70QQOU7Ay074N|264093",
  song: "song/aurora-dreams",
} as const satisfies Track
