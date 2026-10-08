import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayTrouble = {
  id: "01a0676a-d72f-701c-a1cc-400b63f9590d",
  type: "page-type/release",
  slug: "coldplay-trouble",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2000-10-26",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5lVhDQnJYSknv2vLRX9ifV",
      externalLink: "https://open.spotify.com/album/5lVhDQnJYSknv2vLRX9ifV",
    },
  ],
  title: "Trouble",
  createdAt: "2026-09-03T13:17:30.287Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
