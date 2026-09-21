import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveCountryRoad = {
  id: "01a0abeb-3ced-703b-b470-416f88dca10c",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-country-road",
  ownLength: 5.654433333333333,
  ownProgress: 5.654433333333333,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  position: 11,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7iMT9dte1Ml23gxj6k88wx",
      externalLink: "https://open.spotify.com/track/7iMT9dte1Ml23gxj6k88wx",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Country Road",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
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
