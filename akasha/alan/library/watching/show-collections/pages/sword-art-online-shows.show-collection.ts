import type { ShowCollection } from "../show-collection.page-type.ts"

export const swordArtOnlineShows = {
  id: "01a06808-6a77-7011-8f4e-124900563ce7",
  pageTypeSlug: "show-collection",
  slug: "sword-art-online-shows",
  title: "Sword Art Online Shows",
  partOfSlugs: ["sword-art-online"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "following",
  rank: "A",
  externalId: "sword-art-online",
  externalLink: "https://trakt.tv/shows/sword-art-online",
} as const satisfies ShowCollection
