import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lilithMaxMakingsOfAGod = {
  id: "01a0676a-d724-7030-a9fb-7a5a563bd2d9",
  type: "page-type/release",
  slug: "lilith-max-makings-of-a-god",
  grade: "A",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lilith-max"],
  position: 0,
  publishedAt: "2025-09-26",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3d7w0tH9o425GTqkDMR7mK",
      externalLink: "https://open.spotify.com/album/3d7w0tH9o425GTqkDMR7mK",
    },
  ],
  title: "Makings of a God",
} as const satisfies Release
