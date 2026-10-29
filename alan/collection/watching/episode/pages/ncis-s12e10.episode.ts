import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS12e10 = {
  id: "01a1884b-ef72-70e9-82ee-d71e5f0513c7",
  type: "page-type/episode",
  slug: "ncis-s12e10",
  description:
    "The NCIS team consults with three cyber-terrorists they imprisoned after a city-wide Internet shutdown the week before Christmas.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-12"],
  position: 10,
  publishedAt: "2014-12-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1019264",
      externalLink: "https://www.themoviedb.org/tv/4614/season/12/episode/10",
    },
  ],
  title: "House Rules",
  episodeType: "mid-season",
  stillPath: "/jy0XidJKXxy2L9e4KOvDE9JnIwA.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
