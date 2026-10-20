import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaClapYourHands = {
  id: "01a0676a-d71a-7056-97ec-cf55825e6c06",
  type: "page-type/release",
  slug: "sia-clap-your-hands",
  title: "Clap Your Hands",
  partOfCollections: ["artist/sia"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2010-05-25",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3razBQg1Nq3dENB8pg70Pa",
      externalLink: "https://open.spotify.com/album/3razBQg1Nq3dENB8pg70Pa",
      lastSyncedAt: "2025-11-27",
    },
  ],
  createdAt: "2026-09-03T13:17:30.266Z",
  updatedAt: "2026-10-20T14:01:30.339Z",
  progressedAt: "2026-10-20T14:01:30.339Z",
} as const satisfies Release
