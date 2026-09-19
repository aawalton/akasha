import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWhatHappenedToTheHeartDeluxeMyBodyIsNotMine = {
  id: "01a0b637-ed74-7443-a247-5c7e3aca7b21",
  type: "page-type/track",
  slug: "aurora-what-happened-to-the-heart-deluxe-my-body-is-not-mine",
  ownLength: 4.022883333333334,
  ownProgress: 0,
  partOfCollections: ["release/aurora-what-happened-to-the-heart-deluxe"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6BSh9jkMJ9I3KUm9KVBEKz",
      externalLink: "https://open.spotify.com/track/6BSh9jkMJ9I3KUm9KVBEKz",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "My Body Is Not Mine",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "mybodyisnotmine|1WgXqy2Dd70QQOU7Ay074N|241373",
  song: "song/aurora-my-body-is-not-mine",
} as const satisfies Track
