import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeHotelRockBottom = {
  id: "01a0676a-d720-7064-b8b0-9be219cbcc51",
  type: "page-type/release",
  slug: "ariana-grande-hotel-rock-bottom",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2025-07-10",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7CL6fVngqU6X5VYXHQtBis",
      externalLink: "https://open.spotify.com/album/7CL6fVngqU6X5VYXHQtBis",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "Hotel Rock Bottom",
} as const satisfies Release
