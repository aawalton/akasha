import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS02e18 = {
  id: "01a1884b-ef64-74f6-910d-963759fbb2fa",
  type: "page-type/episode",
  slug: "ncis-s02e18",
  description:
    "A Petty Officer that just returned to her job is found dead in the backstage of a bikini contest. The team find out that she possibly had a stalker behind her back.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-2"],
  position: 18,
  publishedAt: "2005-03-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334513",
      externalLink: "https://www.themoviedb.org/tv/4614/season/2/episode/18",
    },
  ],
  title: "Bikini Wax",
  episodeType: "standard",
  stillPath: "/1hSf8FGTPthQvzQMg3Y6eimhP4s.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
