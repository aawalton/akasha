import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixWeNeedALittleChristmasWhiteChristmas = {
  id: "01a1546f-2502-74ad-8b54-ca46582271e5",
  type: "page-type/track",
  slug: "pentatonix-we-need-a-little-christmas-white-christmas",
  ownLength: 3.06375,
  ownProgress: 3.06375,
  partOfCollections: ["release/pentatonix-we-need-a-little-christmas"],
  status: "completed",
  unit: "unit/minutes",
  title: "White Christmas",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { artistName: "Bing Crosby" },
    { artist: "artist/pentatonix" },
    { artistName: "London Symphony Orchestra" },
  ],
  trackKey:
    "whitechristmas|26AHtbjWKiwYzsoGoUZq53,5yxyJsFanEAuwSM5kOuZKc,6ZjFtWeHP9XN7FeKSUe80S|183825",
  song: "song/pentatonix-white-christmas",
  carriedBy: [
    {
      release: "release/pentatonix-we-need-a-little-christmas",
      discNumber: 1,
      position: 11,
      externalId: "6R0ciS6J0RNmUKNI7iFFGG",
      externalLink: "https://open.spotify.com/track/6R0ciS6J0RNmUKNI7iFFGG",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T14:01:21.162Z",
  progressedAt: "2026-10-19T14:01:21.162Z",
} as const satisfies Track
