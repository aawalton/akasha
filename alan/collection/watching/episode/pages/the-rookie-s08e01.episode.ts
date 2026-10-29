import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theRookieS08e01 = {
  id: "01a18858-036f-732f-8f75-b3456c2def57",
  type: "page-type/episode",
  slug: "the-rookie-s08e01",
  description:
    "The LAPD, FBI and Interpol work with Monica Stevens in Prague to target high-value terrorists operating within and outside the United States.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/the-rookie-season-8"],
  position: 1,
  publishedAt: "2026-01-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6638144",
      externalLink: "https://www.themoviedb.org/tv/79744/season/8/episode/1",
    },
  ],
  title: "Czech Mate",
  episodeType: "standard",
  stillPath: "/wcvTN1cGtKa8TitG3BuFp6dqbxR.jpg",
  voteAverage: 9.2,
  createdAt: "2026-10-29T15:47:11.854Z",
  updatedAt: "2026-10-29T15:47:11.854Z",
} as const satisfies Episode
