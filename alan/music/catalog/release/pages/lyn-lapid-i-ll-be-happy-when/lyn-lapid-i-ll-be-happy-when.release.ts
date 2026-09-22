import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lynLapidILlBeHappyWhen = {
  id: "01a0676a-d721-7028-9a5f-ecaea768d090",
  type: "page-type/release",
  slug: "lyn-lapid-i-ll-be-happy-when",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lyn-lapid"],
  position: 0,
  publishedAt: "2025-02-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0EG43re9S4RRLXO6WE2gqD",
      externalLink: "https://open.spotify.com/album/0EG43re9S4RRLXO6WE2gqD",
    },
  ],
  title: "i'll be happy when",
} as const satisfies Release
