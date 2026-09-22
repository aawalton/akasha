import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const nickelCreek2NickelCreek = {
  id: "01a0676a-d725-705a-a8be-2d2365fb90ad",
  type: "page-type/release",
  slug: "nickel-creek-2-nickel-creek",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/nickel-creek"],
  position: 0,
  publishedAt: "2000-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5SGG7graQOU3OnK3cZZCNd",
      externalLink: "https://open.spotify.com/album/5SGG7graQOU3OnK3cZZCNd",
    },
  ],
  title: "Nickel Creek",
} as const satisfies Release
