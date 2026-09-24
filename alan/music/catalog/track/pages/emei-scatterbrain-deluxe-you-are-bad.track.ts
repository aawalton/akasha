import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiScatterbrainDeluxeYouAreBad = {
  id: "01a0c43e-74c5-7d2e-b72b-331f68918952",
  type: "page-type/track",
  slug: "emei-scatterbrain-deluxe-you-are-bad",
  ownLength: 2.3119,
  ownProgress: 2.3119,
  partOfCollections: ["release/emei-scatterbrain-deluxe"],
  status: "completed",
  unit: "unit/minutes",
  title: "You Are Bad",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/emei" }],
  trackKey: "youarebad|7E2aQQjErJocovYFjYLzWU|138714",
  song: "song/emei-you-are-bad",
  carriedBy: [
    {
      release: "release/emei-scatterbrain-deluxe",
      discNumber: 1,
      position: 9,
      externalId: "6tSSghRWA2iOW4jGXSttwX",
      externalLink: "https://open.spotify.com/track/6tSSghRWA2iOW4jGXSttwX",
    },
  ],
} as const satisfies Track
