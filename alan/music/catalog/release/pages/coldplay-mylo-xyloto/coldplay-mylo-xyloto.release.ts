import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayMyloXyloto = {
  id: "01a0676a-d725-703d-a587-84a390040170",
  type: "page-type/release",
  slug: "coldplay-mylo-xyloto",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2011-10-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2R7iJz5uaHjLEVnMkloO18",
      externalLink: "https://open.spotify.com/album/2R7iJz5uaHjLEVnMkloO18",
    },
  ],
  title: "Mylo Xyloto",
} as const satisfies Release
