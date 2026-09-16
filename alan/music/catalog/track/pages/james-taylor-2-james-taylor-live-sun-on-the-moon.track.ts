import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveSunOnTheMoon = {
  id: "01a0abeb-3ddf-7f65-928a-5d37df2c48f5",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-sun-on-the-moon",
  ownLength: 3.746,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "41KyetLigc1HXsW1SLS5jK",
      externalLink: "https://open.spotify.com/track/41KyetLigc1HXsW1SLS5jK",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Sun On The Moon",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "sunonthemoon|0vn7UBvSQECKJm2817Yf1P|224760",
} as const satisfies Track
