import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS06e03 = {
  id: "01a1884b-301d-7d00-a92b-d979c6cf5c50",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s06e03",
  description:
    "Pride travels to New York after new evidence links to a 20-year-old cold case from his time at Jefferson Parish Sheriff's office.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-6"],
  position: 3,
  publishedAt: "2019-10-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1932409",
      externalLink: "https://www.themoviedb.org/tv/61387/season/6/episode/3",
    },
  ],
  title: "Bad Apple",
  episodeType: "standard",
  stillPath: "/rKqFiF5dY9iCujkZ8dUE0QSUjqw.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
