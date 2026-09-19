import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallAncestorsTheLastLeaf = {
  id: "01a0b4c8-203f-7fb2-ae3b-af0215fed613",
  type: "page-type/track",
  slug: "paul-cardall-ancestors-the-last-leaf",
  ownLength: 2.248666666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-ancestors"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6rjT1zD3DfW4EPOQmjzJOf",
      externalLink: "https://open.spotify.com/track/6rjT1zD3DfW4EPOQmjzJOf",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "The Last Leaf",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "thelastleaf|7FQRbf8gbKw8KZQZAJWxH2|134920",
  song: "song/paul-cardall-the-last-leaf",
} as const satisfies Track
