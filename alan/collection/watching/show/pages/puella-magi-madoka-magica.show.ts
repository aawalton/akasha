import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const puellaMagiMadokaMagica = {
  id: "01a183d5-bf57-7fd9-b5b2-901a531c7fa4",
  type: "page-type/show",
  slug: "puella-magi-madoka-magica",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/puella-magi-madoka-magica"],
  publishedAt: "2011-01-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "39218", externalLink: "https://www.themoviedb.org/tv/39218" },
  ],
  title: "Puella Magi Madoka Magica",
  createdAt: "2026-10-28T18:46:25.878Z",
  updatedAt: "2026-10-28T18:46:25.878Z",
} as const satisfies Show
