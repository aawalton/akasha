import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraSkyConcertInTheLightOriginalGameSoundtrackQueendom = {
  id: "01a0b637-f366-7b8e-bc6c-ed2aaf97b614",
  type: "page-type/track",
  slug: "aurora-sky-concert-in-the-light-original-game-soundtrack-queendom",
  ownLength: 3.444,
  ownProgress: 0,
  partOfCollections: ["release/aurora-sky-concert-in-the-light-original-game-soundtrack"],
  position: 16,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4KL2R4rnk43g8a2t0ZObhb",
      externalLink: "https://open.spotify.com/track/4KL2R4rnk43g8a2t0ZObhb",
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
