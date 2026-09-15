import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const nickelCreek2NickelCreek = {
  id: "01a0676a-d725-705a-a8be-2d2365fb90ad",
  type: "page-type/release",
  slug: "nickel-creek-2-nickel-creek",
  title: "Nickel Creek",
  partOfCollections: ["artist/nickel-creek"],
  position: 0,
  ownLength: 49.601133,
  ownProgress: 49.601133,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2000-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5SGG7graQOU3OnK3cZZCNd",
      externalLink: "https://open.spotify.com/album/5SGG7graQOU3OnK3cZZCNd",
    },
  ],
} as const satisfies Release
