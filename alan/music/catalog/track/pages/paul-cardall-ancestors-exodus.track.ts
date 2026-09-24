import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallAncestorsExodus = {
  id: "01a0b4c8-1ed2-75eb-babc-2fb54c6136c7",
  type: "page-type/track",
  slug: "paul-cardall-ancestors-exodus",
  ownLength: 3.6538,
  ownProgress: 3.6538,
  partOfCollections: ["release/paul-cardall-ancestors"],
  status: "completed",
  unit: "unit/minutes",
  title: "Exodus",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "exodus|7FQRbf8gbKw8KZQZAJWxH2|219228",
  song: "song/paul-cardall-exodus",
  carriedBy: [
    {
      release: "release/paul-cardall-ancestors",
      discNumber: 1,
      position: 5,
      externalId: "2DNcBLxH2Ew6rnU52QolkY",
      externalLink: "https://open.spotify.com/track/2DNcBLxH2Ew6rnU52QolkY",
    },
  ],
} as const satisfies Track
