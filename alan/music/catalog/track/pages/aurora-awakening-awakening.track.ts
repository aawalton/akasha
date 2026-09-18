import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraAwakeningAwakening = {
  id: "01a0b638-127e-7870-a843-aaedb3d90e02",
  type: "page-type/track",
  slug: "aurora-awakening-awakening",
  ownLength: 3.6830166666666666,
  ownProgress: 0,
  partOfCollections: ["release/aurora-awakening"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4U5WvRz4XVuP5vBpZysJCU",
      externalLink: "https://open.spotify.com/track/4U5WvRz4XVuP5vBpZysJCU",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Awakening",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "awakening|1WgXqy2Dd70QQOU7Ay074N|220981",
} as const satisfies Track
