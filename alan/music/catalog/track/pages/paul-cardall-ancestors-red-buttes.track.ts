import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallAncestorsRedButtes = {
  id: "01a0b4c8-1f84-7ab3-9dd7-61214490cb4c",
  type: "page-type/track",
  slug: "paul-cardall-ancestors-red-buttes",
  ownLength: 3.50435,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-ancestors"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4XN97BWKDHKmcee14vToq7",
      externalLink: "https://open.spotify.com/track/4XN97BWKDHKmcee14vToq7",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Red Buttes",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "redbuttes|7FQRbf8gbKw8KZQZAJWxH2|210261",
  song: "song/paul-cardall-red-buttes",
} as const satisfies Track
