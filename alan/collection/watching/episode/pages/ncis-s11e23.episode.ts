import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS11e23 = {
  id: "01a1884b-ef71-75f1-9075-c2372c5713ae",
  type: "page-type/episode",
  slug: "ncis-s11e23",
  description:
    "Director Vance gives DiNozzo a special assignment to bring home an Admiral’s daughter from Paris, but he must turn to his NCIS team for help after he enters a controversial crime scene.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-11"],
  position: 23,
  publishedAt: "2014-05-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "975312",
      externalLink: "https://www.themoviedb.org/tv/4614/season/11/episode/23",
    },
  ],
  title: "The Admiral's Daughter",
  episodeType: "standard",
  stillPath: "/acUQyYHUaPrTArhYfd3UijUwrcf.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
