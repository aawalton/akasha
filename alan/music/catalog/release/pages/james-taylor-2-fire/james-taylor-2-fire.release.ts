import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jamesTaylor2Fire = {
  id: "01a0676a-d71d-707a-b549-5ae06083527b",
  type: "page-type/release",
  slug: "james-taylor-2-fire",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/james-taylor"],
  position: 0,
  publishedAt: "2000-01-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2ATrZVFsFYoyFaOr0xtDhB",
      externalLink: "https://open.spotify.com/album/2ATrZVFsFYoyFaOr0xtDhB",
    },
  ],
  title: "Fire",
  createdAt: "2026-09-03T13:17:30.269Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
