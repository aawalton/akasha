import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraWhatHappenedToTheHeartTheConflictOfTheMind = {
  id: "01a0b637-eeff-763b-ac2a-8aaa3c39b0f0",
  type: "page-type/track",
  slug: "aurora-what-happened-to-the-heart-the-conflict-of-the-mind",
  ownLength: 4.24355,
  ownProgress: 0,
  partOfCollections: ["release/aurora-what-happened-to-the-heart"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0mwf9Wp3U2wENjzG5dk7cG",
      externalLink: "https://open.spotify.com/track/0mwf9Wp3U2wENjzG5dk7cG",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The Conflict Of The Mind",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "theconflictofthemind|1WgXqy2Dd70QQOU7Ay074N|254613",
  song: "song/aurora-the-conflict-of-the-mind",
} as const satisfies Track
