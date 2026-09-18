import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraComeCloserABoyLikeYou = {
  id: "01a0b637-e74d-7d79-8b7b-f2a235176194",
  type: "page-type/track",
  slug: "aurora-come-closer-a-boy-like-you",
  ownLength: 5.013766666666666,
  ownProgress: 0,
  partOfCollections: ["release/aurora-come-closer"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3ZUkekftKnIHyG62CnvCxs",
      externalLink: "https://open.spotify.com/track/3ZUkekftKnIHyG62CnvCxs",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "A BOY LIKE YOU",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "5r0BuurxKQugj8cjHiO8pY", artistName: "TOMORA" },
    { externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" },
    { externalId: "45F5Ue9KSHAtp7aE85zlsW", artistName: "Tom Rowlands" },
  ],
  trackKey:
    "aboylikeyou|1WgXqy2Dd70QQOU7Ay074N,45F5Ue9KSHAtp7aE85zlsW,5r0BuurxKQugj8cjHiO8pY|300826",
} as const satisfies Track
