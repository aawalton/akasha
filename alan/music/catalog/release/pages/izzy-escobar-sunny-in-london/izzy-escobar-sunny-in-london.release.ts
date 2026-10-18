import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const izzyEscobarSunnyInLondon = {
  id: "01a0676a-d72a-7044-87cf-fea397dec5f7",
  type: "page-type/release",
  slug: "izzy-escobar-sunny-in-london",
  title: "Sunny in London",
  partOfCollections: ["artist/izzy-escobar"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2025-10-24",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "00uTgbxW2rWkJWQZp5SbXB",
      externalLink: "https://open.spotify.com/album/00uTgbxW2rWkJWQZp5SbXB",
      lastSyncedAt: "2025-11-15",
    },
  ],
  createdAt: "2026-09-03T13:17:30.282Z",
  updatedAt: "2026-10-18T14:00:36.173Z",
} as const satisfies Release
