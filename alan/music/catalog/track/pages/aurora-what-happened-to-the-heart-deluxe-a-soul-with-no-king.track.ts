import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWhatHappenedToTheHeartDeluxeASoulWithNoKing = {
  id: "01a0b637-ec8a-7aa4-bdb8-731eb5c24ef9",
  type: "page-type/track",
  slug: "aurora-what-happened-to-the-heart-deluxe-a-soul-with-no-king",
  ownLength: 4.40755,
  ownProgress: 0,
  partOfCollections: ["release/aurora-what-happened-to-the-heart-deluxe"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1UNZwi9zgSngoU7Yt0SXG1",
      externalLink: "https://open.spotify.com/track/1UNZwi9zgSngoU7Yt0SXG1",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "A Soul With No King",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "asoulwithnoking|1WgXqy2Dd70QQOU7Ay074N|264453",
  song: "song/aurora-a-soul-with-no-king",
} as const satisfies Track
