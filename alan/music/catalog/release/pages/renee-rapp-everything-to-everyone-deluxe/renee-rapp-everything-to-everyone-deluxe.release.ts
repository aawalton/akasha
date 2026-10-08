import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const reneeRappEverythingToEveryoneDeluxe = {
  id: "01a0676a-d71d-7043-b998-baac6bd2fe6e",
  type: "page-type/release",
  slug: "renee-rapp-everything-to-everyone-deluxe",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/renee-rapp"],
  position: 0,
  publishedAt: "2023-02-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1KSAqXIHFEWo73keoru7FX",
      externalLink: "https://open.spotify.com/album/1KSAqXIHFEWo73keoru7FX",
    },
  ],
  title: "Everything To Everyone (Deluxe)",
  createdAt: "2026-09-03T13:17:30.269Z",
  updatedAt: "2026-09-22T20:00:29.000Z",
} as const satisfies Release
