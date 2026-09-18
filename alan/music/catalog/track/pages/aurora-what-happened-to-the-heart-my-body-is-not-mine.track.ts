import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWhatHappenedToTheHeartMyBodyIsNotMine = {
  id: "01a0b637-f0c4-7a4e-9547-7e44f237f92e",
  type: "page-type/track",
  slug: "aurora-what-happened-to-the-heart-my-body-is-not-mine",
  ownLength: 4.022883333333334,
  ownProgress: 0,
  partOfCollections: ["release/aurora-what-happened-to-the-heart"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4lr9e261UuIx3lMgQtdxGy",
      externalLink: "https://open.spotify.com/track/4lr9e261UuIx3lMgQtdxGy",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "My Body Is Not Mine",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "mybodyisnotmine|1WgXqy2Dd70QQOU7Ay074N|241373",
} as const satisfies Track
