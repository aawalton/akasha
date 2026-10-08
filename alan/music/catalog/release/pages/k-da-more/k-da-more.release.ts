import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const kDaMore = {
  id: "01a0676a-d725-7000-954f-056dac84a608",
  type: "page-type/release",
  slug: "k-da-more",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/k-da"],
  position: 0,
  publishedAt: "2020-10-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5v3ALaT37zXgVHr3MZTVVx",
      externalLink: "https://open.spotify.com/album/5v3ALaT37zXgVHr3MZTVVx",
    },
  ],
  title: "MORE",
  createdAt: "2026-09-03T13:17:30.277Z",
  updatedAt: "2026-09-22T14:00:43.000Z",
} as const satisfies Release
