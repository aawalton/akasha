import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const jojoSBizarreAdventure = {
  id: "01a183d4-4632-741d-9030-e5513c264081",
  type: "page-type/show",
  slug: "jojo-s-bizarre-adventure",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["fandom/jojo-s-bizarre-adventure"],
  publishedAt: "2012-10-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    { source: "tmdb", externalId: "45790", externalLink: "https://www.themoviedb.org/tv/45790" },
  ],
  title: "JoJo's Bizarre Adventure",
  createdAt: "2026-10-28T18:44:49.318Z",
  updatedAt: "2026-10-28T18:44:49.318Z",
} as const satisfies Show
