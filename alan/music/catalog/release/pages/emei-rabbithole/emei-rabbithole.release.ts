import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emeiRabbithole = {
  id: "01a0676a-d727-703d-9216-ea902e739103",
  type: "page-type/release",
  slug: "emei-rabbithole",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/emei"],
  position: 0,
  publishedAt: "2024-08-23",
  grade: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0OptWsRKyw5TsNeiEshGfr",
      externalLink: "https://open.spotify.com/album/0OptWsRKyw5TsNeiEshGfr",
    },
  ],
  title: "RABBITHOLE",
  createdAt: "2026-09-03T13:17:30.279Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Release
