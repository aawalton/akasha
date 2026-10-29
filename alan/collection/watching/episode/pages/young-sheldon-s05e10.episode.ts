import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const youngSheldonS05e10 = {
  id: "01a1885a-252e-7646-8589-e69192beff27",
  type: "page-type/episode",
  slug: "young-sheldon-s05e10",
  description:
    "Sheldon gets a dorm room all to himself. Also, Connie gains an unwanted business partner.",
  ownLength: 19,
  ownProgress: 0,
  partOfCollections: ["season/young-sheldon-season-5"],
  position: 10,
  publishedAt: "2022-01-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3385557",
      externalLink: "https://www.themoviedb.org/tv/71728/season/5/episode/10",
    },
  ],
  title: "An Expensive Glitch and a Goof-Off Room",
  episodeType: "standard",
  stillPath: "/ysc9uzSiCHOAKMxrOy2VLPpe2DA.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:49:31.561Z",
  updatedAt: "2026-10-29T15:49:31.561Z",
} as const satisfies Episode
