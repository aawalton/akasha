import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraIDrinkTheLightIDrinkTheLight = {
  id: "01a0b637-ea55-72f8-b52c-14b40fdef2c6",
  type: "page-type/track",
  slug: "aurora-i-drink-the-light-i-drink-the-light",
  ownLength: 7.948216666666666,
  ownProgress: 0,
  partOfCollections: ["release/aurora-i-drink-the-light"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4ytjR8q5geAVO7EQM9Gjzd",
      externalLink: "https://open.spotify.com/track/4ytjR8q5geAVO7EQM9Gjzd",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "I DRINK THE LIGHT",
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
