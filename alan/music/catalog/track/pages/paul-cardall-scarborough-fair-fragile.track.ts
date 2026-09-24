import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallScarboroughFairFragile = {
  id: "01a0b4c8-6b59-79dc-9901-67d7945b0838",
  type: "page-type/track",
  slug: "paul-cardall-scarborough-fair-fragile",
  ownLength: 2.84125,
  ownProgress: 2.84125,
  partOfCollections: ["release/paul-cardall-scarborough-fair"],
  status: "completed",
  unit: "unit/minutes",
  title: "Fragile",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "fragile|7FQRbf8gbKw8KZQZAJWxH2|170475",
  song: "song/paul-cardall-fragile",
  carriedBy: [
    {
      release: "release/paul-cardall-scarborough-fair",
      discNumber: 1,
      position: 3,
      externalId: "3x2nYN0AYbGx5PltryC96B",
      externalLink: "https://open.spotify.com/track/3x2nYN0AYbGx5PltryC96B",
    },
  ],
} as const satisfies Track
