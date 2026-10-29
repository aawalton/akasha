import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS02e20 = {
  id: "01a1884b-3017-7187-a136-7b38d85e1f49",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s02e20",
  description:
    "The NCIS team investigates the murder of a Navy Lieutenant during a French Quarter second line funeral procession, a New Orleans tradition that celebrates the recently deceased with a musical street parade.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-2"],
  position: 20,
  publishedAt: "2016-04-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1177517",
      externalLink: "https://www.themoviedb.org/tv/61387/season/2/episode/20",
    },
  ],
  title: "Second Line",
  episodeType: "standard",
  stillPath: "/9LdorvUghwo9Fx2RJfTEY4zZxkw.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
