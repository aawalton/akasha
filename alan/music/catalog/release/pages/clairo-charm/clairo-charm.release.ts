import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const clairoCharm = {
  id: "01a0676a-d71a-701c-8306-e719ca8f1a09",
  type: "page-type/release",
  slug: "clairo-charm",
  title: "Charm",
  partOfCollections: ["artist/clairo"],
  position: 0,
  ownLength: 38.1186,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-07-12",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1KNUCVXgIxKUGiuEB8eG0i",
      externalLink: "https://open.spotify.com/album/1KNUCVXgIxKUGiuEB8eG0i",
    },
  ],
  createdAt: "2026-09-03T13:17:30.266Z",
  updatedAt: "2026-09-15T16:34:44.000Z",
} as const satisfies Release
