import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixWhiteChristmasWhiteChristmas = {
  id: "01a1546f-2502-7243-abef-9e06a9ac0ef3",
  type: "page-type/track",
  slug: "pentatonix-white-christmas-white-christmas",
  ownLength: 3.0606666666666666,
  ownProgress: 0,
  partOfCollections: ["release/pentatonix-white-christmas"],
  status: "not-started",
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
    "whitechristmas|26AHtbjWKiwYzsoGoUZq53,5yxyJsFanEAuwSM5kOuZKc,6ZjFtWeHP9XN7FeKSUe80S|183640",
  song: "song/pentatonix-white-christmas",
  carriedBy: [
    {
      release: "release/pentatonix-white-christmas",
      discNumber: 1,
      position: 1,
      externalId: "6jOmT70UbnRW7grIBKrJfw",
      externalLink: "https://open.spotify.com/track/6jOmT70UbnRW7grIBKrJfw",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Track
