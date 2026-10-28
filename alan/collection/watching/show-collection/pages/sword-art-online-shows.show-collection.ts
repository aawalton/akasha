import type { ShowCollection } from "akasha/alan/collection/watching/show-collection/show-collection.page-type.types.ts"

export const swordArtOnlineShows = {
  id: "01a06808-6a77-7011-8f4e-124900563ce7",
  type: "page-type/show-collection",
  slug: "sword-art-online-shows",
  title: "Sword Art Online Shows",
  partOfCollections: [],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "following",
  grade: "A",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "sword-art-online",
      externalLink: "https://trakt.tv/shows/sword-art-online",
    },
  ],
  createdAt: "2026-09-03T16:09:37.143Z",
  updatedAt: "2026-10-28T18:39:52.205Z",
} as const satisfies ShowCollection
