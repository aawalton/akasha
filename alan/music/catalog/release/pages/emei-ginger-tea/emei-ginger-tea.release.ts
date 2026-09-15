import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emeiGingerTea = {
  id: "01a0676a-d71e-7065-a4a0-5c265dce825d",
  type: "release",
  slug: "emei-ginger-tea",
  title: "Ginger Tea",
  partOfCollections: ["artist/emei"],
  position: 0,
  ownLength: 3.684867,
  ownProgress: 3.684867,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2025-12-12",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3HD6dMq4zT1yMugmUNNZdN",
      externalLink: "https://open.spotify.com/album/3HD6dMq4zT1yMugmUNNZdN",
      lastSyncedAt: "2025-12-31",
    },
  ],
} as const satisfies Release
