import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraComeCloserWavelengths = {
  id: "01a0b637-e849-7450-9d21-f3be08aafffe",
  type: "page-type/track",
  slug: "aurora-come-closer-wavelengths",
  ownLength: 5.455766666666666,
  ownProgress: 0,
  partOfCollections: ["release/aurora-come-closer"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5RKxMGzcvhdXtBQjOAC4Fu",
      externalLink: "https://open.spotify.com/track/5RKxMGzcvhdXtBQjOAC4Fu",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "WAVELENGTHS",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "5r0BuurxKQugj8cjHiO8pY", artistName: "TOMORA" },
    { externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" },
    { externalId: "45F5Ue9KSHAtp7aE85zlsW", artistName: "Tom Rowlands" },
  ],
  trackKey:
    "wavelengths|1WgXqy2Dd70QQOU7Ay074N,45F5Ue9KSHAtp7aE85zlsW,5r0BuurxKQugj8cjHiO8pY|327346",
  song: "song/aurora-wavelengths",
} as const satisfies Track
