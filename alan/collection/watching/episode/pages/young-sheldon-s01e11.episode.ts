import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const youngSheldonS01e11 = {
  id: "01a1885a-252a-727b-8a7e-7935e731e4a2",
  type: "page-type/episode",
  slug: "young-sheldon-s01e11",
  description:
    "A worried Mary sends Sheldon to Sunday school after she finds him playing Dungeons and Dragons with his friends, Tam and Billy.",
  ownLength: 19,
  ownProgress: 0,
  partOfCollections: ["season/young-sheldon-season-1"],
  position: 11,
  publishedAt: "2018-01-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1415337",
      externalLink: "https://www.themoviedb.org/tv/71728/season/1/episode/11",
    },
  ],
  title: "Demons, Sunday School, and Prime Numbers",
  episodeType: "standard",
  stillPath: "/dShnl52EiYU3QiVIu88ouQs9j8M.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:49:31.561Z",
  updatedAt: "2026-10-29T15:49:31.561Z",
} as const satisfies Episode
