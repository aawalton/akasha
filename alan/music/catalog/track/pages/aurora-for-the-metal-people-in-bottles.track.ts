import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraForTheMetalPeopleInBottles = {
  id: "01a0b638-06e2-7de9-984b-67f5bf090943",
  type: "page-type/track",
  slug: "aurora-for-the-metal-people-in-bottles",
  ownLength: 3.969533333333333,
  ownProgress: 0,
  partOfCollections: ["release/aurora-for-the-metal-people"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2ViiSVrwTOxKhmYX8fNIA3",
      externalLink: "https://open.spotify.com/track/2ViiSVrwTOxKhmYX8fNIA3",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "In Bottles",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "inbottles|1WgXqy2Dd70QQOU7Ay074N|238172",
} as const satisfies Track
