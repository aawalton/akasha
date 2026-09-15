import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lilithMaxBornToDie = {
  id: "01a0676a-d719-7024-ad22-f53f77bf7014",
  type: "page-type/release",
  slug: "lilith-max-born-to-die",
  title: "Born to Die",
  partOfCollections: ["artist/lilith-max"],
  position: 0,
  ownLength: 2.277483,
  ownProgress: 2.277483,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2021-07-09",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2P0CpAZLIxXpsWzvypi35P",
      externalLink: "https://open.spotify.com/album/2P0CpAZLIxXpsWzvypi35P",
    },
  ],
} as const satisfies Release
