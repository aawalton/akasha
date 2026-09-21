import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraSomeTypeOfSkin = {
  id: "01a0676a-d729-7052-8b24-4edaddf10eeb",
  type: "page-type/release",
  slug: "aurora-some-type-of-skin",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2024-05-10",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1kLM9sRXSaIxGRz18pE6DU",
      externalLink: "https://open.spotify.com/album/1kLM9sRXSaIxGRz18pE6DU",
    },
  ],
  title: "Some Type Of Skin",
} as const satisfies Release
