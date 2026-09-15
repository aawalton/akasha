import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraAnimalSoul = {
  id: "01a0676a-d717-7020-839e-1331ea555a1e",
  type: "page-type/release",
  slug: "aurora-animal-soul",
  title: "Animal Soul",
  partOfCollections: ["artist/aurora"],
  position: 0,
  ownLength: 3.036667,
  ownProgress: 3.036667,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2024-05-17",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0uf9rINfXEDXVkgF2LjNDj",
      externalLink: "https://open.spotify.com/album/0uf9rINfXEDXVkgF2LjNDj",
    },
  ],
} as const satisfies Release
