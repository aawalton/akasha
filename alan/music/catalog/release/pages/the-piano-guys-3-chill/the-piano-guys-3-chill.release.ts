import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3Chill = {
  id: "01a0676a-d71a-702b-af29-cfba10523613",
  type: "page-type/release",
  slug: "the-piano-guys-3-chill",
  title: "Chill",
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  ownLength: 49.04045,
  ownProgress: 49.04045,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2021-10-22",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7iCG2ULUgJYAuR5FrTyOcW",
      externalLink: "https://open.spotify.com/album/7iCG2ULUgJYAuR5FrTyOcW",
    },
  ],
} as const satisfies Release
