import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS01e25 = {
  id: "01a183d1-bb4b-7042-9e2d-e03293aea63b",
  type: "page-type/episode",
  slug: "naruto-s01e25",
  description:
    "Ibiki declares what seems like a harsh and unreasonable rule for the hardest part of the first exam.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-1"],
  position: 25,
  publishedAt: "2003-03-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "908150",
      externalLink: "https://www.themoviedb.org/tv/46260/season/1/episode/25",
    },
  ],
  title: "The Tenth Question: All or Nothing!",
  episodeType: "standard",
  stillPath: "/ggsD7py8c7EDWHheDq2fMeM5JbS.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
