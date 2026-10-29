import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const babylon5S02e09 = {
  id: "01a18843-507f-7731-80af-d81d8e2b7fb8",
  type: "page-type/episode",
  slug: "babylon-5-s02e09",
  description:
    "The aging Centauri emperor travels to Babylon 5 despite his failing health. Refa sees this as an opportunity to have Londo publicly embarrass the emperor, while G'Kar prepares to assassinate him.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/babylon-5-the-coming-of-shadows"],
  position: 9,
  publishedAt: "1995-02-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "235863",
      externalLink: "https://www.themoviedb.org/tv/3137/season/2/episode/9",
    },
  ],
  title: "The Coming of Shadows",
  episodeType: "standard",
  stillPath: "/pWWM6cs0MwrXReJnKGCceW5ieTo.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:24:35.325Z",
  updatedAt: "2026-10-29T15:24:35.325Z",
} as const satisfies Episode
