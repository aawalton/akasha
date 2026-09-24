import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2FlagRainyDayMan = {
  id: "01a0abeb-4543-74f1-b43f-f31d3e7356eb",
  type: "page-type/track",
  slug: "james-taylor-2-flag-rainy-day-man",
  ownLength: 2.9882166666666667,
  ownProgress: 2.9882166666666667,
  partOfCollections: ["release/james-taylor-2-flag"],
  status: "completed",
  unit: "unit/minutes",
  title: "Rainy Day Man",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "rainydayman|0vn7UBvSQECKJm2817Yf1P|179293",
  song: "song/james-taylor-rainy-day-man",
  carriedBy: [
    {
      release: "release/james-taylor-2-flag",
      discNumber: 1,
      position: 8,
      externalId: "6N65FzCD0K0SbCWx73D5o0",
      externalLink: "https://open.spotify.com/track/6N65FzCD0K0SbCWx73D5o0",
    },
  ],
} as const satisfies Track
