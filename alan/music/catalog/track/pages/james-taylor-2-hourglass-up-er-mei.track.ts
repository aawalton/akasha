import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2HourglassUpErMei = {
  id: "01a0abeb-3adc-7d17-9a12-22c7748ec6c8",
  type: "page-type/track",
  slug: "james-taylor-2-hourglass-up-er-mei",
  ownLength: 3.782216666666667,
  ownProgress: 3.782216666666667,
  partOfCollections: ["release/james-taylor-2-hourglass"],
  status: "completed",
  unit: "unit/minutes",
  title: "Up Er Mei",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "upermei|0vn7UBvSQECKJm2817Yf1P|226933",
  song: "song/james-taylor-up-er-mei",
  carriedBy: [
    {
      release: "release/james-taylor-2-hourglass",
      discNumber: 1,
      position: 8,
      externalId: "1N7oGtGMR3GzIN1WpcS62z",
      externalLink: "https://open.spotify.com/track/1N7oGtGMR3GzIN1WpcS62z",
    },
  ],
} as const satisfies Track
