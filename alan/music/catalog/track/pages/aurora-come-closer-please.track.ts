import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraComeCloserPlease = {
  id: "01a0b637-e6ea-7806-b5cf-b289d7af8751",
  type: "page-type/track",
  slug: "aurora-come-closer-please",
  ownLength: 0.5166666666666667,
  ownProgress: 0,
  partOfCollections: ["release/aurora-come-closer"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4kdiZfBFDWQXbDfMK51HDf",
      externalLink: "https://open.spotify.com/track/4kdiZfBFDWQXbDfMK51HDf",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "PLEASE",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "5r0BuurxKQugj8cjHiO8pY", artistName: "TOMORA" },
    { externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" },
    { externalId: "45F5Ue9KSHAtp7aE85zlsW", artistName: "Tom Rowlands" },
  ],
  trackKey: "please|1WgXqy2Dd70QQOU7Ay074N,45F5Ue9KSHAtp7aE85zlsW,5r0BuurxKQugj8cjHiO8pY|31000",
} as const satisfies Track
