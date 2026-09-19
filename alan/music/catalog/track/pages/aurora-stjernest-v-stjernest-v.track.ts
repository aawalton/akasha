import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraStjernestVStjernestV = {
  id: "01a0b638-0b72-7427-a12b-e012af0925e1",
  type: "page-type/track",
  slug: "aurora-stjernest-v-stjernest-v",
  ownLength: 3.30075,
  ownProgress: 0,
  partOfCollections: ["release/aurora-stjernest-v"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2g7kOfDm0QfGHICnvJfP0e",
      externalLink: "https://open.spotify.com/track/2g7kOfDm0QfGHICnvJfP0e",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Stjernestøv",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "stjernestv|1WgXqy2Dd70QQOU7Ay074N|198045",
  song: "song/aurora-stjernest-v",
} as const satisfies Track
