import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraComeCloserABoyLikeYou = {
  id: "01a0b637-e74d-7d79-8b7b-f2a235176194",
  type: "page-type/track",
  slug: "aurora-come-closer-a-boy-like-you",
  grade: "C",
  ownLength: 5.013766666666666,
  ownProgress: 5.013766666666666,
  partOfCollections: ["release/aurora-come-closer"],
  status: "completed",
  unit: "unit/minutes",
  title: "A BOY LIKE YOU",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { externalId: "5r0BuurxKQugj8cjHiO8pY", artistName: "TOMORA" },
    { externalId: "1WgXqy2Dd70QQOU7Ay074N", artistName: "AURORA" },
    { externalId: "45F5Ue9KSHAtp7aE85zlsW", artistName: "Tom Rowlands" },
  ],
  trackKey:
    "aboylikeyou|1WgXqy2Dd70QQOU7Ay074N,45F5Ue9KSHAtp7aE85zlsW,5r0BuurxKQugj8cjHiO8pY|300826",
  song: "song/aurora-a-boy-like-you",
  carriedBy: [
    {
      release: "release/aurora-come-closer",
      discNumber: 1,
      position: 3,
      externalId: "3ZUkekftKnIHyG62CnvCxs",
      externalLink: "https://open.spotify.com/track/3ZUkekftKnIHyG62CnvCxs",
    },
  ],
} as const satisfies Track
