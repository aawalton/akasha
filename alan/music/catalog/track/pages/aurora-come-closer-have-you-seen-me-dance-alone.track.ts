import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraComeCloserHaveYouSeenMeDanceAlone = {
  id: "01a0b637-e7c7-7bd4-81f2-a4be6fa6f995",
  type: "page-type/track",
  slug: "aurora-come-closer-have-you-seen-me-dance-alone",
  ownLength: 4.355333333333333,
  ownProgress: 0,
  partOfCollections: ["release/aurora-come-closer"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2SIZNY1MeFaxnbyOwCBVjP",
      externalLink: "https://open.spotify.com/track/2SIZNY1MeFaxnbyOwCBVjP",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "HAVE YOU SEEN ME DANCE ALONE?",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "5r0BuurxKQugj8cjHiO8pY", artistName: "TOMORA" },
    { externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" },
    { externalId: "45F5Ue9KSHAtp7aE85zlsW", artistName: "Tom Rowlands" },
  ],
  trackKey:
    "haveyouseenmedancealone|1WgXqy2Dd70QQOU7Ay074N,45F5Ue9KSHAtp7aE85zlsW,5r0BuurxKQugj8cjHiO8pY|261320",
} as const satisfies Track
