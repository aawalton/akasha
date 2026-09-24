import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallAncestorsRedButtes = {
  id: "01a0b4c8-1f84-7ab3-9dd7-61214490cb4c",
  type: "page-type/track",
  slug: "paul-cardall-ancestors-red-buttes",
  ownLength: 3.50435,
  ownProgress: 3.50435,
  partOfCollections: ["release/paul-cardall-ancestors"],
  status: "completed",
  unit: "unit/minutes",
  title: "Red Buttes",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "redbuttes|7FQRbf8gbKw8KZQZAJWxH2|210261",
  song: "song/paul-cardall-red-buttes",
  carriedBy: [
    {
      release: "release/paul-cardall-ancestors",
      discNumber: 1,
      position: 10,
      externalId: "4XN97BWKDHKmcee14vToq7",
      externalLink: "https://open.spotify.com/track/4XN97BWKDHKmcee14vToq7",
    },
  ],
} as const satisfies Track
