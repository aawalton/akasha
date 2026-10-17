import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaStarsExile = {
  id: "01a14a1d-db51-75f8-ab06-57771a646f15",
  type: "page-type/track",
  slug: "enya-stars-exile",
  ownLength: 4.368883333333334,
  ownProgress: 0,
  partOfCollections: ["release/enya-stars"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Exile",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/enya" }],
  trackKey: "exile|6uothxMWeLWIhsGeF7cyo4|262133",
  song: "song/enya-exile",
  carriedBy: [
    {
      release: "release/enya-stars",
      discNumber: 1,
      position: 9,
      externalId: "7DHYLGnhdmeladlQ0LM0Nf",
      externalLink: "https://open.spotify.com/track/7DHYLGnhdmeladlQ0LM0Nf",
    },
  ],
  createdAt: "2026-10-17T13:47:13.085Z",
  updatedAt: "2026-10-17T13:47:13.085Z",
} as const satisfies Track
