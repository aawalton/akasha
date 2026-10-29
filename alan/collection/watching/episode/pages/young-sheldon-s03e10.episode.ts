import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const youngSheldonS03e10 = {
  id: "01a1885a-252c-7113-aee9-49ab1a5d2069",
  type: "page-type/episode",
  slug: "young-sheldon-s03e10",
  description:
    "Sheldon fakes being sick to avoid a swim test at school. Also, Dr. Sturgis spies on Connie's new boyfriend.",
  ownLength: 19,
  ownProgress: 0,
  partOfCollections: ["season/young-sheldon-season-3"],
  position: 10,
  publishedAt: "2019-12-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1990985",
      externalLink: "https://www.themoviedb.org/tv/71728/season/3/episode/10",
    },
  ],
  title: "Teenager Soup and a Little Ball of Fib",
  episodeType: "mid-season",
  stillPath: "/87Tiwm5qKdvOmySOtKwpL2spfFj.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:49:31.561Z",
  updatedAt: "2026-10-29T15:49:31.561Z",
} as const satisfies Episode
