import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lilithMaxOrion = {
  id: "01a0676a-d726-704c-af77-d3d4a92a54c2",
  type: "page-type/release",
  slug: "lilith-max-orion",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lilith-max"],
  position: 0,
  publishedAt: "2025-09-12",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5XV5vYFUWD0ilmoa5ZnpWK",
      externalLink: "https://open.spotify.com/album/5XV5vYFUWD0ilmoa5ZnpWK",
    },
  ],
  title: "Orion",
  createdAt: "2026-09-03T13:17:30.278Z",
  updatedAt: "2026-09-22T14:00:43.000Z",
} as const satisfies Release
