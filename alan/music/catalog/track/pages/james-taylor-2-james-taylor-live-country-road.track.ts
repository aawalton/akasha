import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveCountryRoad = {
  id: "01a0abeb-3ced-703b-b470-416f88dca10c",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-country-road",
  ownLength: 5.654433333333333,
  ownProgress: 5.654433333333333,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "Country Road",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "countryroad|0vn7UBvSQECKJm2817Yf1P|339266",
  song: "song/james-taylor-country-road",
  carriedBy: [
    {
      release: "release/james-taylor-2-james-taylor-live",
      discNumber: 1,
      position: 11,
      externalId: "7iMT9dte1Ml23gxj6k88wx",
      externalLink: "https://open.spotify.com/track/7iMT9dte1Ml23gxj6k88wx",
    },
  ],
} as const satisfies Track
