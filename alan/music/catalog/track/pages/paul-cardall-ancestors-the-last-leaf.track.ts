import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallAncestorsTheLastLeaf = {
  id: "01a0b4c8-203f-7fb2-ae3b-af0215fed613",
  type: "page-type/track",
  slug: "paul-cardall-ancestors-the-last-leaf",
  ownLength: 2.248666666666667,
  ownProgress: 2.248666666666667,
  partOfCollections: ["release/paul-cardall-ancestors"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Last Leaf",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "thelastleaf|7FQRbf8gbKw8KZQZAJWxH2|134920",
  song: "song/paul-cardall-the-last-leaf",
  carriedBy: [
    {
      release: "release/paul-cardall-ancestors",
      discNumber: 1,
      position: 15,
      externalId: "6rjT1zD3DfW4EPOQmjzJOf",
      externalLink: "https://open.spotify.com/track/6rjT1zD3DfW4EPOQmjzJOf",
    },
  ],
} as const satisfies Track
