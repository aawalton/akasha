import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const rockapellaBang = {
  id: "01a0676a-d718-7014-bb00-83e2fbb2976c",
  type: "page-type/release",
  slug: "rockapella-bang",
  title: "Bang",
  partOfCollections: ["artist/rockapella"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2010-10-12",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3y7Sk6v8mTAv1KPNKO4pMV",
      externalLink: "https://open.spotify.com/album/3y7Sk6v8mTAv1KPNKO4pMV",
    },
  ],
  createdAt: "2026-09-03T13:17:30.264Z",
  updatedAt: "2026-09-24T21:00:29.000Z",
} as const satisfies Release
