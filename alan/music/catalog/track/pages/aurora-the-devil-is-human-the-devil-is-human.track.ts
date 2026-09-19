import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraTheDevilIsHumanTheDevilIsHuman = {
  id: "01a0b638-0333-7cdc-b2a4-ddc099452d01",
  type: "page-type/track",
  slug: "aurora-the-devil-is-human-the-devil-is-human",
  ownLength: 3.0102166666666665,
  ownProgress: 0,
  partOfCollections: ["release/aurora-the-devil-is-human"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2nLEh1IAezKeXKCGfYULmX",
      externalLink: "https://open.spotify.com/track/2nLEh1IAezKeXKCGfYULmX",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The Devil is Human",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" }],
  trackKey: "thedevilishuman|1WgXqy2Dd70QQOU7Ay074N|180613",
  song: "song/aurora-the-devil-is-human",
} as const satisfies Track
