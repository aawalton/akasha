import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emeiGingerTea = {
  id: "01a0676a-d71e-7065-a4a0-5c265dce825d",
  type: "page-type/release",
  slug: "emei-ginger-tea",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/emei"],
  position: 0,
  publishedAt: "2025-12-12",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3HD6dMq4zT1yMugmUNNZdN",
      externalLink: "https://open.spotify.com/album/3HD6dMq4zT1yMugmUNNZdN",
      lastSyncedAt: "2025-12-31",
    },
  ],
  title: "Ginger Tea",
} as const satisfies Release
