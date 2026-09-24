import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiGingerTeaGingerTea = {
  id: "01a0c43e-7677-74d4-b2fe-e49e50317dd9",
  type: "page-type/track",
  slug: "emei-ginger-tea-ginger-tea",
  ownLength: 2.620433333333333,
  ownProgress: 2.620433333333333,
  partOfCollections: ["release/emei-ginger-tea"],
  status: "completed",
  unit: "unit/minutes",
  title: "Ginger Tea",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/emei" }],
  trackKey: "gingertea|7E2aQQjErJocovYFjYLzWU|157226",
  song: "song/emei-ginger-tea",
  carriedBy: [
    {
      release: "release/emei-ginger-tea",
      discNumber: 1,
      position: 1,
      externalId: "4jBCtBR2iSffMZPh3Bdk2L",
      externalLink: "https://open.spotify.com/track/4jBCtBR2iSffMZPh3Bdk2L",
    },
  ],
} as const satisfies Track
