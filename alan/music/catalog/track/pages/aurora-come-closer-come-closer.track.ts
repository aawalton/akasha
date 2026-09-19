import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraComeCloserComeCloser = {
  id: "01a0b637-e718-7d8b-9e1b-d4aab0732186",
  type: "page-type/track",
  slug: "aurora-come-closer-come-closer",
  ownLength: 4.474216666666667,
  ownProgress: 0,
  partOfCollections: ["release/aurora-come-closer"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4Stp1AipGFX83wDSJRsX17",
      externalLink: "https://open.spotify.com/track/4Stp1AipGFX83wDSJRsX17",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "COME CLOSER",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "5r0BuurxKQugj8cjHiO8pY", artistName: "TOMORA" },
    { externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" },
    { externalId: "45F5Ue9KSHAtp7aE85zlsW", artistName: "Tom Rowlands" },
  ],
  trackKey:
    "comecloser|1WgXqy2Dd70QQOU7Ay074N,45F5Ue9KSHAtp7aE85zlsW,5r0BuurxKQugj8cjHiO8pY|268453",
  song: "song/aurora-come-closer",
} as const satisfies Track
