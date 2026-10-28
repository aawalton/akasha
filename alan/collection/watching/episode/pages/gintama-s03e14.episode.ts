import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gintamaS03e14 = {
  id: "01a183d6-3266-7d1c-aa42-cea9bc76b35e",
  type: "page-type/episode",
  slug: "gintama-s03e14",
  description:
    'A member of the Shinsengumi suggests a "washroom revolution". Eventually it evolves into a battle of Shinsengumi vs. washroom germs.',
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/gintama-season-3"],
  position: 14,
  publishedAt: "2008-07-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "940497",
      externalLink: "https://www.themoviedb.org/tv/57041/season/3/episode/14",
    },
  ],
  title: "Cleaning the Toilet Cleanses the Soul",
  episodeType: "standard",
  stillPath: "/mWErlAbjNuMYLUr3F3tES9WU5v0.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-28T18:46:55.326Z",
  updatedAt: "2026-10-28T18:46:55.326Z",
} as const satisfies Episode
