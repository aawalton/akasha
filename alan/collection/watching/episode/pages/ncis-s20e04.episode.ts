import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS20e04 = {
  id: "01a1884b-ef81-76e3-8c4e-1728e2153a4b",
  type: "page-type/episode",
  slug: "ncis-s20e04",
  description:
    "Agent Knight's past resurfaces when her ex-boyfriend, a National Parks Service agent, teams up with NCIS to investigate a campsite murder.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-20"],
  position: 4,
  publishedAt: "2022-10-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3962450",
      externalLink: "https://www.themoviedb.org/tv/4614/season/20/episode/4",
    },
  ],
  title: "Leave No Trace",
  episodeType: "standard",
  stillPath: "/78DXCyqNL2kXsbgzxT9BjLKAtyx.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
