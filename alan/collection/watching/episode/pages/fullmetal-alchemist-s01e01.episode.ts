import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const fullmetalAlchemistS01e01 = {
  id: "01a183d2-7f3f-75f1-b6e0-1116263f3029",
  type: "page-type/episode",
  slug: "fullmetal-alchemist-s01e01",
  description:
    "When Edward and Alphonse meet a so-called religious leader who can invoke miracles, they believe he's carrying the philosopher's stone.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/fullmetal-alchemist-season-1"],
  position: 1,
  publishedAt: "2003-10-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "853003",
      externalLink: "https://www.themoviedb.org/tv/37863/season/1/episode/1",
    },
  ],
  title: "Those Who Challenge the Sun",
  episodeType: "standard",
  stillPath: "/rb2gslYskRBe0U1ZYcMVm6s7SQG.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-28T18:42:52.863Z",
  updatedAt: "2026-10-28T18:42:52.863Z",
} as const satisfies Episode
