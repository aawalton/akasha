import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS02e02 = {
  id: "01a18848-3731-79a6-bbb5-600eb8ea5895",
  type: "page-type/episode",
  slug: "eureka-s02e02",
  description:
    "Fargo accidentally triggers a prototype for a personal force field, which goes out of control, forcing Carter to enlist Stark's help.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-2"],
  position: 2,
  publishedAt: "2007-07-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335241",
      externalLink: "https://www.themoviedb.org/tv/4620/season/2/episode/2",
    },
  ],
  title: "Try, Try Again",
  episodeType: "standard",
  stillPath: "/jpnw5giL3QcTqlPpe2VBIJEUztw.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
