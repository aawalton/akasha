import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS14e13 = {
  id: "01a1884b-ef75-75a8-a16c-1676084efb07",
  type: "page-type/episode",
  slug: "ncis-s14e13",
  description:
    "During an NCIS hit-and-run investigation, Palmer joins a stranger on the outside ledge of a building in an attempt to save his life.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-14"],
  position: 13,
  publishedAt: "2017-01-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1254447",
      externalLink: "https://www.themoviedb.org/tv/4614/season/14/episode/13",
    },
  ],
  title: "Keep Going",
  episodeType: "standard",
  stillPath: "/e2UZUre18T94XJUr4GgzO17dNID.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
