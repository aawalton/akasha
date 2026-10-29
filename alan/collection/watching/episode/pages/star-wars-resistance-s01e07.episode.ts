import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsResistanceS01e07 = {
  id: "01a18853-f9af-7ddb-8d65-8729266ff07c",
  type: "page-type/episode",
  slug: "star-wars-resistance-s01e07",
  description:
    "On a mission to repair a vital platform defense, Kaz befriends the mysterious Synara and comes under attack by pirates.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-resistance-season-1"],
  position: 7,
  publishedAt: "2018-11-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1598481",
      externalLink: "https://www.themoviedb.org/tv/79093/season/1/episode/7",
    },
  ],
  title: "Synara's Score",
  episodeType: "standard",
  stillPath: "/p8rinP5r7uycqOPopjJdldilhsT.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:42:47.214Z",
  updatedAt: "2026-10-29T15:42:47.214Z",
} as const satisfies Episode
