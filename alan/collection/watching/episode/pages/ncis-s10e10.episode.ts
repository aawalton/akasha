import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS10e10 = {
  id: "01a1884b-ef6f-787e-ace7-b91b65406d73",
  type: "page-type/episode",
  slug: "ncis-s10e10",
  description:
    "It’s Christmas time and Tony DiNozzo can’t decide if he’ll be naughty or nice when his dad, Anthony DiNozzo, Sr., comes to town for a visit.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-10"],
  position: 10,
  publishedAt: "2012-12-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334680",
      externalLink: "https://www.themoviedb.org/tv/4614/season/10/episode/10",
    },
  ],
  title: "You Better Watch Out",
  episodeType: "mid-season",
  stillPath: "/k45fqbcEUoC0UI4qgG8QHllJxAZ.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
