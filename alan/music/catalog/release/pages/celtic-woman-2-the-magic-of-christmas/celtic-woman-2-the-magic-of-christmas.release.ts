import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const celticWoman2TheMagicOfChristmas = {
  id: "01a0676a-d72d-703d-a025-fa7012b84b08",
  type: "page-type/release",
  slug: "celtic-woman-2-the-magic-of-christmas",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/celtic-woman"],
  position: 0,
  publishedAt: "2019-10-25",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6LOuVUBwcD90rvV3ZZBtFi",
      externalLink: "https://open.spotify.com/album/6LOuVUBwcD90rvV3ZZBtFi",
    },
  ],
  title: "The Magic Of Christmas",
  createdAt: "2026-09-03T13:17:30.285Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
