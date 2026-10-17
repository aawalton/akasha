import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const enyaStars = {
  id: "01a0676a-d72a-7012-bdaf-d8573077df23",
  type: "page-type/release",
  slug: "enya-stars",
  title: "Stars",
  partOfCollections: ["artist/enya"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1997-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "72w5kKwWOO5b065Flb8hv2",
      externalLink: "https://open.spotify.com/album/72w5kKwWOO5b065Flb8hv2",
    },
  ],
  createdAt: "2026-09-03T13:17:30.282Z",
  updatedAt: "2026-10-17T14:01:01.286Z",
} as const satisfies Release
