import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jessicaBaioPetals = {
  id: "01a0676a-d726-7073-8c47-49a045b7e839",
  type: "page-type/release",
  slug: "jessica-baio-petals",
  grade: "A",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jessica-baio"],
  position: 0,
  publishedAt: "2024-01-12",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0nCriAFnpCNUPgF9VtWhFb",
      externalLink: "https://open.spotify.com/album/0nCriAFnpCNUPgF9VtWhFb",
    },
  ],
  title: "petals",
} as const satisfies Release
