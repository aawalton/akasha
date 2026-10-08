import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const imagineDragonsMonicaDemo = {
  id: "01a0676a-d724-707f-9299-e7cada4e71ed",
  type: "page-type/release",
  slug: "imagine-dragons-monica-demo",
  title: "Monica (Demo)",
  partOfCollections: ["artist/imagine-dragons"],
  position: 0,
  ownLength: 3.304867,
  ownProgress: 3.304867,
  unit: "unit/minutes",
  status: "completed",
  grade: "C",
  publishedAt: "2025-01-27",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4zjnl4eftRAHuPmajFqCPN",
      externalLink: "https://open.spotify.com/album/4zjnl4eftRAHuPmajFqCPN",
    },
  ],
  createdAt: "2026-09-03T13:17:30.276Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Release
