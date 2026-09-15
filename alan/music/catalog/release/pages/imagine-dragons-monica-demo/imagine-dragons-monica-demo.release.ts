import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const imagineDragonsMonicaDemo = {
  id: "01a0676a-d724-707f-9299-e7cada4e71ed",
  type: "release",
  slug: "imagine-dragons-monica-demo",
  title: "Monica (Demo)",
  partOfCollections: ["artist/imagine-dragons"],
  position: 0,
  ownLength: 3.304867,
  ownProgress: 3.304867,
  unit: "unit/minutes",
  status: "completed",
  rank: "C",
  publishedAt: "2025-01-27",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4zjnl4eftRAHuPmajFqCPN",
      externalLink: "https://open.spotify.com/album/4zjnl4eftRAHuPmajFqCPN",
    },
  ],
} as const satisfies Release
