import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const imagineDragonsOriginsDeluxe = {
  id: "01a0676a-d726-7049-ab20-488306d9f5a5",
  type: "page-type/release",
  slug: "imagine-dragons-origins-deluxe",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/imagine-dragons"],
  position: 0,
  publishedAt: "2018-11-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3JfSxDfmwS5OeHPwLSkrfr",
      externalLink: "https://open.spotify.com/album/3JfSxDfmwS5OeHPwLSkrfr",
    },
  ],
  title: "Origins (Deluxe)",
} as const satisfies Release
