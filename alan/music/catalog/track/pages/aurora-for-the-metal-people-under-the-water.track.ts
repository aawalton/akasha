import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraForTheMetalPeopleUnderTheWater = {
  id: "01a0b638-066d-7401-aacb-012606acbaf5",
  type: "page-type/track",
  slug: "aurora-for-the-metal-people-under-the-water",
  ownLength: 4.41,
  ownProgress: 0,
  partOfCollections: ["release/aurora-for-the-metal-people"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2NNWSsNGoJI57E1l0DwiXY",
      externalLink: "https://open.spotify.com/track/2NNWSsNGoJI57E1l0DwiXY",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Under the Water",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "underthewater|1WgXqy2Dd70QQOU7Ay074N|264600",
  song: "song/aurora-under-the-water",
} as const satisfies Track
