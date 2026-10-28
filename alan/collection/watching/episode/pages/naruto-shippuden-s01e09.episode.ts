import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoShippudenS01e09 = {
  id: "01a183d2-3bd4-7e68-bfc0-d8216f7f3b03",
  type: "page-type/episode",
  slug: "naruto-shippuden-s01e09",
  description:
    "On her way to the Sand Village, Temari encounters Kakashi and his team. Kakashi admonishes Naruto when he tries to rush ahead…",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/naruto-shippuden-season-1"],
  position: 9,
  publishedAt: "2007-04-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "761480",
      externalLink: "https://www.themoviedb.org/tv/31910/season/1/episode/9",
    },
  ],
  title: "The Jinchuriki's Tears",
  episodeType: "standard",
  stillPath: "/6FUS8cyaBOW3FzKWF68mrgOH13T.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-28T18:42:35.603Z",
  updatedAt: "2026-10-28T18:42:35.603Z",
} as const satisfies Episode
