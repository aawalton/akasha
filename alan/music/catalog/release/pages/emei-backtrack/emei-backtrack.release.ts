import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emeiBacktrack = {
  id: "01a0676a-d718-7002-b310-3e1d3d08dcde",
  type: "page-type/release",
  slug: "emei-backtrack",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/emei"],
  position: 0,
  publishedAt: "2022-11-29",
  grade: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0X3WVWpooMcgdYUCGQDzJy",
      externalLink: "https://open.spotify.com/album/0X3WVWpooMcgdYUCGQDzJy",
    },
  ],
  title: "Backtrack",
  createdAt: "2026-09-03T13:17:30.264Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Release
