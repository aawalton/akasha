import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const nsync2NSync = {
  id: "01a0676a-d725-703e-859d-231360a7961e",
  type: "page-type/release",
  slug: "nsync-2-n-sync",
  title: "'N Sync",
  partOfCollections: ["artist/nsync"],
  position: 0,
  ownLength: 50.277733,
  ownProgress: 50.277733,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1997-05-26",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0CADmCXbIx4F9m6TBwLtFd",
      externalLink: "https://open.spotify.com/album/0CADmCXbIx4F9m6TBwLtFd",
    },
  ],
} as const satisfies Release
