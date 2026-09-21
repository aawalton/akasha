import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraAnimalSoul = {
  id: "01a0676a-d717-7020-839e-1331ea555a1e",
  type: "page-type/release",
  slug: "aurora-animal-soul",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2024-05-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0uf9rINfXEDXVkgF2LjNDj",
      externalLink: "https://open.spotify.com/album/0uf9rINfXEDXVkgF2LjNDj",
    },
  ],
  title: "Animal Soul",
} as const satisfies Release
