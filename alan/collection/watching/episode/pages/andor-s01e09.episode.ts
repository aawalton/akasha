import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const andorS01e09 = {
  id: "01a18843-1870-72bb-970d-9de7c0667fa4",
  type: "page-type/episode",
  slug: "andor-s01e09",
  description:
    "Under intense scrutiny while imprisoned, Cassian makes allies plan an impossible escape.",
  ownLength: 50,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-andor-season-1"],
  position: 9,
  publishedAt: "2022-11-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3745389",
      externalLink: "https://www.themoviedb.org/tv/83867/season/1/episode/9",
    },
  ],
  title: "Nobody's Listening!",
  episodeType: "standard",
  stillPath: "/7F5jhvS1XC7GgKRS9gWYMclh92H.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:24:20.975Z",
  updatedAt: "2026-10-29T15:24:20.975Z",
} as const satisfies Episode
