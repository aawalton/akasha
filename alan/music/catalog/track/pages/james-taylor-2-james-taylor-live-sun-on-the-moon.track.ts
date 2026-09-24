import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveSunOnTheMoon = {
  id: "01a0abeb-3ddf-7f65-928a-5d37df2c48f5",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-sun-on-the-moon",
  ownLength: 3.746,
  ownProgress: 3.746,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "Sun On The Moon",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "sunonthemoon|0vn7UBvSQECKJm2817Yf1P|224760",
  song: "song/james-taylor-sun-on-the-moon",
  carriedBy: [
    {
      release: "release/james-taylor-2-james-taylor-live",
      discNumber: 2,
      position: 4,
      externalId: "41KyetLigc1HXsW1SLS5jK",
      externalLink: "https://open.spotify.com/track/41KyetLigc1HXsW1SLS5jK",
    },
  ],
} as const satisfies Track
