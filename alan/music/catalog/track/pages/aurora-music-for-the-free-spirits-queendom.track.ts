import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraMusicForTheFreeSpiritsQueendom = {
  id: "01a0b638-0916-7d8e-bc39-2d5089c3524e",
  type: "page-type/track",
  slug: "aurora-music-for-the-free-spirits-queendom",
  ownLength: 3.444,
  ownProgress: 0,
  partOfCollections: ["release/aurora-music-for-the-free-spirits"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5GPyOwkaw56kiRI1gZNBtf",
      externalLink: "https://open.spotify.com/track/5GPyOwkaw56kiRI1gZNBtf",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Queendom",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "queendom|1WgXqy2Dd70QQOU7Ay074N|206640",
  song: "song/aurora-queendom",
} as const satisfies Track
