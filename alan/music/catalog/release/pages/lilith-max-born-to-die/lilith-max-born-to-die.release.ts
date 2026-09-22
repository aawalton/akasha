import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lilithMaxBornToDie = {
  id: "01a0676a-d719-7024-ad22-f53f77bf7014",
  type: "page-type/release",
  slug: "lilith-max-born-to-die",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/lilith-max"],
  position: 0,
  publishedAt: "2021-07-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2P0CpAZLIxXpsWzvypi35P",
      externalLink: "https://open.spotify.com/album/2P0CpAZLIxXpsWzvypi35P",
    },
  ],
  title: "Born to Die",
} as const satisfies Release
