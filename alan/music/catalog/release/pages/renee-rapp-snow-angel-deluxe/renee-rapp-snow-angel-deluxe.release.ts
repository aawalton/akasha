import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const reneeRappSnowAngelDeluxe = {
  id: "01a0676a-d729-703a-a4cb-fd4a093ec941",
  type: "page-type/release",
  slug: "renee-rapp-snow-angel-deluxe",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/renee-rapp"],
  position: 0,
  publishedAt: "2023-11-17",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7pPV0OFuytqNj7ar82Hizf",
      externalLink: "https://open.spotify.com/album/7pPV0OFuytqNj7ar82Hizf",
    },
  ],
  title: "Snow Angel (Deluxe)",
  createdAt: "2026-09-03T13:17:30.281Z",
  updatedAt: "2026-09-22T20:00:29.000Z",
} as const satisfies Release
