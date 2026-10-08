import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const katyPerryNeverReallyOver = {
  id: "01a0676a-d725-704b-945e-7864bbff3f6c",
  type: "page-type/release",
  slug: "katy-perry-never-really-over",
  title: "Never Really Over",
  partOfCollections: ["artist/katy-perry"],
  position: 0,
  ownLength: 3.725383,
  ownProgress: 3.725383,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2019-05-31",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3KjXg0MDej2pG9fv6I22lT",
      externalLink: "https://open.spotify.com/album/3KjXg0MDej2pG9fv6I22lT",
    },
  ],
  createdAt: "2026-09-03T13:17:30.277Z",
  updatedAt: "2026-09-15T16:37:02.000Z",
} as const satisfies Release
