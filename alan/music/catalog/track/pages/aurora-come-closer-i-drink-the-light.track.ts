import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraComeCloserIDrinkTheLight = {
  id: "01a0b637-e81c-7384-ba41-37672ed06e73",
  type: "page-type/track",
  slug: "aurora-come-closer-i-drink-the-light",
  ownLength: 7.948216666666666,
  ownProgress: 0,
  partOfCollections: ["release/aurora-come-closer"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1YsBC7h8KSnWjQdddkfrnz",
      externalLink: "https://open.spotify.com/track/1YsBC7h8KSnWjQdddkfrnz",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "I DRINK THE LIGHT",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "5r0BuurxKQugj8cjHiO8pY", artistName: "TOMORA" },
    { externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" },
    { externalId: "45F5Ue9KSHAtp7aE85zlsW", artistName: "Tom Rowlands" },
  ],
  trackKey:
    "idrinkthelight|1WgXqy2Dd70QQOU7Ay074N,45F5Ue9KSHAtp7aE85zlsW,5r0BuurxKQugj8cjHiO8pY|476893",
  song: "song/aurora-i-drink-the-light",
} as const satisfies Track
