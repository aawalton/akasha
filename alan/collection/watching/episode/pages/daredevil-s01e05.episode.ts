import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const daredevilS01e05 = {
  id: "01a18845-e1fa-7b7b-9e78-f86a072a59c9",
  type: "page-type/episode",
  slug: "daredevil-s01e05",
  description:
    "A day in the life of Matt Murdock gets intense, forcing him to team up with a familiar face.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/marvel-s-daredevil-season-1"],
  position: 5,
  publishedAt: "2025-03-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5688005",
      externalLink: "https://www.themoviedb.org/tv/202555/season/1/episode/5",
    },
  ],
  title: "With Interest",
  episodeType: "standard",
  stillPath: "/qGZrykdKMOtO5H7yEVA28NGl8bS.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:27:23.641Z",
  updatedAt: "2026-10-29T15:27:23.641Z",
} as const satisfies Episode
