import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiDistractedDistracted = {
  id: "01a0c43e-7e85-7b3d-96f0-f64bb65154e0",
  type: "page-type/track",
  slug: "emei-distracted-distracted",
  ownLength: 2.68,
  ownProgress: 2.68,
  partOfCollections: ["release/emei-distracted"],
  status: "completed",
  unit: "unit/minutes",
  title: "Distracted",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/emei" }],
  trackKey: "distracted|7E2aQQjErJocovYFjYLzWU|160800",
  song: "song/emei-distracted",
  carriedBy: [
    {
      release: "release/emei-distracted",
      discNumber: 1,
      position: 1,
      externalId: "3cajPGP49WC0dxOsRmS1WY",
      externalLink: "https://open.spotify.com/track/3cajPGP49WC0dxOsRmS1WY",
    },
  ],
} as const satisfies Track
