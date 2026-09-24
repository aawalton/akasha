import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeMyEverythingTenthAnniversaryEditionProblem = {
  id: "01a0a6c5-1641-763b-8f47-fb99adc617a9",
  type: "page-type/track",
  slug: "ariana-grande-my-everything-tenth-anniversary-edition-problem",
  ownLength: 3.233216666666667,
  ownProgress: 3.233216666666667,
  partOfCollections: [
    "release/ariana-grande-my-everything-tenth-anniversary-edition",
    "release/ariana-grande-problem",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Problem",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }, { artistName: "Iggy Azalea" }],
  trackKey: "problem|5yG7ZAZafVaAlMTeBybKAL,66CXWjxzNUsdJxJ2JdwvnR|193993",
  song: "song/ariana-grande-problem",
  carriedBy: [
    {
      release: "release/ariana-grande-my-everything-tenth-anniversary-edition",
      discNumber: 1,
      position: 2,
      externalId: "4jwPNgd0ux1wE4TgETVIT3",
      externalLink: "https://open.spotify.com/track/4jwPNgd0ux1wE4TgETVIT3",
    },
    {
      release: "release/ariana-grande-problem",
      discNumber: 1,
      position: 1,
      externalId: "1f9MXvV39Mrx2TAEx5M2TB",
      externalLink: "https://open.spotify.com/track/1f9MXvV39Mrx2TAEx5M2TB",
    },
  ],
} as const satisfies Track
