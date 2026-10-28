import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const monogatariSeason2 = {
  id: "01a183db-793e-702a-a379-05b7b7cee24f",
  type: "page-type/season",
  slug: "monogatari-season-2",
  description:
    "High school student Koyomi Araragi survived a vampire attack and can’t stop getting mixed up with all kinds of apparitions—but he’s about to face his biggest challenge yet: protecting his two little sisters! Karen and Tsukihi have a penchant for justice, and it’s up to Koyomi to keep them safe as they track down the cause of their apparitions.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/monogatari"],
  position: 2,
  publishedAt: "2012-01-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "54547",
      externalLink: "https://www.themoviedb.org/tv/46195/season/2",
    },
  ],
  title: "Nisemonogatari",
  posterPath: "/qbX28SjRreSzDsD7rGxkakjnjSQ.jpg",
  voteAverage: 6.7,
  createdAt: "2026-10-28T18:52:41.143Z",
  updatedAt: "2026-10-28T18:52:41.143Z",
} as const satisfies Season
