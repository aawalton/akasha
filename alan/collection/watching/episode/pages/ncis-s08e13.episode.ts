import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS08e13 = {
  id: "01a1884b-ef6d-72e7-b968-1883f2134f2e",
  type: "page-type/episode",
  slug: "ncis-s08e13",
  description:
    "The NCIS team springs into action to find the assailant responsible for beating a Marine to death in his own backyard.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-8"],
  position: 13,
  publishedAt: "2011-02-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334579",
      externalLink: "https://www.themoviedb.org/tv/4614/season/8/episode/13",
    },
  ],
  title: "Freedom",
  episodeType: "standard",
  stillPath: "/roHiO3ILOkgUil4hbzTcRlOoLiu.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
