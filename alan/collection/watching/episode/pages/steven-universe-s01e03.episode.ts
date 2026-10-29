import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS01e03 = {
  id: "01a18855-67e4-74f9-b409-8215a52cc071",
  type: "page-type/episode",
  slug: "steven-universe-s01e03",
  description:
    "The Gems go on a mission to place a Moon Goddess statue on top of the ruined Lunar Sea Spire, and Steven tries to prove he can be useful with the help of his new novelty cheeseburger backpack.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-1"],
  position: 3,
  publishedAt: "2013-11-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1003596",
      externalLink: "https://www.themoviedb.org/tv/61175/season/1/episode/3",
    },
  ],
  title: "Cheeseburger Backpack",
  episodeType: "standard",
  stillPath: "/hoF4HmBVme4LskxnJiyhpKmVHVf.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
