import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const vampireKnightSeason2 = {
  id: "01a183d8-f259-78ed-8d10-e80c8daa8347",
  type: "page-type/season",
  slug: "vampire-knight-season-2",
  description:
    "In Season 2, Cross Academy student Yuki is determined to uncover the truth about her past, but she will have to choose between Kaname and Zero.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/vampire-knight"],
  position: 2,
  publishedAt: "2008-10-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "28169",
      externalLink: "https://www.themoviedb.org/tv/17149/season/2",
    },
  ],
  title: "Vampire Knight: Guilty",
  posterPath: "/e6GAqvRJrNn8YXF5AWgptUc3qXm.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-28T18:49:55.542Z",
  updatedAt: "2026-10-28T18:49:55.542Z",
} as const satisfies Season
