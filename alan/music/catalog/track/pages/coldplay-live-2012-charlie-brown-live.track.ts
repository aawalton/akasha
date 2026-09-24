import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayLive2012CharlieBrownLive = {
  id: "01a0b9ee-dae7-7a5c-9a3d-42cbf80f79ea",
  type: "page-type/track",
  slug: "coldplay-live-2012-charlie-brown-live",
  ownLength: 5.012433333333333,
  ownProgress: 5.012433333333333,
  partOfCollections: ["release/coldplay-live-2012"],
  status: "completed",
  unit: "unit/minutes",
  title: "Charlie Brown - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "charliebrownlive|4gzpq5DPGxSnKTe4SA8HAU|300746",
  song: "song/coldplay-charlie-brown",
  carriedBy: [
    {
      release: "release/coldplay-live-2012",
      discNumber: 1,
      position: 10,
      externalId: "1u0LrLPnIfVeHOzFfye3Lf",
      externalLink: "https://open.spotify.com/track/1u0LrLPnIfVeHOzFfye3Lf",
    },
  ],
} as const satisfies Track
