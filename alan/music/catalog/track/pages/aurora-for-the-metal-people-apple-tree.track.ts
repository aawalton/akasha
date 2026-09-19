import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraForTheMetalPeopleAppleTree = {
  id: "01a0b638-0736-7321-9c14-99f96375d599",
  type: "page-type/track",
  slug: "aurora-for-the-metal-people-apple-tree",
  ownLength: 3.1350333333333333,
  ownProgress: 0,
  partOfCollections: ["release/aurora-for-the-metal-people"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6zwPdwW9HepDJBBCblybMC",
      externalLink: "https://open.spotify.com/track/6zwPdwW9HepDJBBCblybMC",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Apple Tree",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "appletree|1WgXqy2Dd70QQOU7Ay074N|188102",
  song: "song/aurora-apple-tree",
} as const satisfies Track
