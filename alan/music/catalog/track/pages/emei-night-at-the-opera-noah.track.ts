import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiNightAtTheOperaNoah = {
  id: "01a0c43e-7094-7bd4-a837-4d46ce8b76a6",
  type: "page-type/track",
  slug: "emei-night-at-the-opera-noah",
  grade: "B",
  ownLength: 2.6654833333333334,
  ownProgress: 2.6654833333333334,
  partOfCollections: ["release/emei-night-at-the-opera"],
  status: "completed",
  unit: "unit/minutes",
  title: "Noah",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/emei" }],
  trackKey: "noah|7E2aQQjErJocovYFjYLzWU|159929",
  song: "song/emei-noah",
  carriedBy: [
    {
      release: "release/emei-night-at-the-opera",
      discNumber: 1,
      position: 3,
      externalId: "1Ez185Inp2jiQWtcvtAQXl",
      externalLink: "https://open.spotify.com/track/1Ez185Inp2jiQWtcvtAQXl",
    },
  ],
} as const satisfies Track
