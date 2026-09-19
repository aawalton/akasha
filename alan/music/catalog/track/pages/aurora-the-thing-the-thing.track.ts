import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraTheThingTheThing = {
  id: "01a0b637-fe08-7f61-9b3b-6e30831e8380",
  type: "page-type/track",
  slug: "aurora-the-thing-the-thing",
  ownLength: 5.6353333333333335,
  ownProgress: 0,
  partOfCollections: ["release/aurora-the-thing"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "43EE1xyVwIskJP13cJZJ6j",
      externalLink: "https://open.spotify.com/track/43EE1xyVwIskJP13cJZJ6j",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "THE THING",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "5r0BuurxKQugj8cjHiO8pY", artistName: "TOMORA" },
    { externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" },
    { externalId: "45F5Ue9KSHAtp7aE85zlsW", artistName: "Tom Rowlands" },
  ],
  trackKey: "thething|1WgXqy2Dd70QQOU7Ay074N,45F5Ue9KSHAtp7aE85zlsW,5r0BuurxKQugj8cjHiO8pY|338120",
  song: "song/aurora-the-thing",
} as const satisfies Track
