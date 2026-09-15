import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const imagineDragonsOriginsDeluxe = {
  id: "01a0676a-d726-7049-ab20-488306d9f5a5",
  type: "page-type/release",
  slug: "imagine-dragons-origins-deluxe",
  title: "Origins (Deluxe)",
  partOfCollections: ["artist/imagine-dragons"],
  position: 0,
  ownLength: 52.509933,
  ownProgress: 52.509933,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2018-11-09",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3JfSxDfmwS5OeHPwLSkrfr",
      externalLink: "https://open.spotify.com/album/3JfSxDfmwS5OeHPwLSkrfr",
    },
  ],
} as const satisfies Release
