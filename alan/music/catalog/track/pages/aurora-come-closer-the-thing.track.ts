import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraComeCloserTheThing = {
  id: "01a0b637-e8a2-7b91-914c-a382f781694a",
  type: "page-type/track",
  slug: "aurora-come-closer-the-thing",
  ownLength: 5.6353333333333335,
  ownProgress: 0,
  partOfCollections: ["release/aurora-come-closer"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "73TBGeURpzzUGTghL8UyvP",
      externalLink: "https://open.spotify.com/track/73TBGeURpzzUGTghL8UyvP",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "THE THING",
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
