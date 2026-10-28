import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const narutoSeason2 = {
  id: "01a183d1-bb61-7b84-bbfe-15ee376016d7",
  type: "page-type/season",
  slug: "naruto-season-2",
  description:
    "Before the final round of the Chunin Exam, Naruto receives some special training from the legendary Toad Sage, Jiraiya. When the battles resume, Naruto is ready, but what about Sasuke? He's about to face the one ninja no one, not even Naruto thinks he can beat. But in the midst of everything, a sinister plot is set in motion, and the Village Hidden in the Leaves finds itself under attack!",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/naruto"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "54567",
      externalLink: "https://www.themoviedb.org/tv/46260/season/2",
    },
  ],
  title: "Naruto Season 2",
  posterPath: "/yBHXns4g7gWcWuQfOzL4Jekj74e.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Season
