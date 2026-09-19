import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraComeCloserSideBySide = {
  id: "01a0b637-e876-7d7d-bcae-715bce44f1d8",
  type: "page-type/track",
  slug: "aurora-come-closer-side-by-side",
  ownLength: 2.95555,
  ownProgress: 0,
  partOfCollections: ["release/aurora-come-closer"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5mxcwu4cs5KsMmoP37l68U",
      externalLink: "https://open.spotify.com/track/5mxcwu4cs5KsMmoP37l68U",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "SIDE BY SIDE",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "5r0BuurxKQugj8cjHiO8pY", artistName: "TOMORA" },
    { externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" },
    { externalId: "45F5Ue9KSHAtp7aE85zlsW", artistName: "Tom Rowlands" },
  ],
  trackKey:
    "sidebyside|1WgXqy2Dd70QQOU7Ay074N,45F5Ue9KSHAtp7aE85zlsW,5r0BuurxKQugj8cjHiO8pY|177333",
  song: "song/aurora-side-by-side",
} as const satisfies Track
