import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiLoveMeNotLoveMeNot = {
  id: "01a0c43e-7a74-7036-ba0c-ab817ecba69e",
  type: "page-type/track",
  slug: "emei-love-me-not-love-me-not",
  ownLength: 2.33925,
  ownProgress: 2.33925,
  partOfCollections: ["release/emei-love-me-not"],
  status: "completed",
  unit: "unit/minutes",
  title: "Love Me Not",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/emei" }],
  trackKey: "lovemenot|7E2aQQjErJocovYFjYLzWU|140355",
  song: "song/emei-love-me-not",
  carriedBy: [
    {
      release: "release/emei-love-me-not",
      discNumber: 1,
      position: 1,
      externalId: "6UumSbVp1ae6IfcOWDo1oL",
      externalLink: "https://open.spotify.com/track/6UumSbVp1ae6IfcOWDo1oL",
    },
  ],
} as const satisfies Track
