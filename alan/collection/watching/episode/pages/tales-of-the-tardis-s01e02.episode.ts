import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const talesOfTheTardisS01e02 = {
  id: "01a18855-d686-71f2-857f-d6a1e238d9d2",
  type: "page-type/episode",
  slug: "tales-of-the-tardis-s01e02",
  description:
    "Jamie and Zoe meet again and remember their encounter with robots, clockwork soldiers and Medusa in a Land of Fiction governed by a mysterious master.",
  ownLength: 98,
  ownProgress: 0,
  partOfCollections: ["season/tales-of-the-tardis-season-1"],
  position: 2,
  publishedAt: "2023-11-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4877008",
      externalLink: "https://www.themoviedb.org/tv/238486/season/1/episode/2",
    },
  ],
  title: "The Mind Robber",
  episodeType: "standard",
  stillPath: "/vx4xwg8xcTFOTOyDEVQ9ph9cT1X.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:44:49.285Z",
  updatedAt: "2026-10-29T15:44:49.285Z",
} as const satisfies Episode
