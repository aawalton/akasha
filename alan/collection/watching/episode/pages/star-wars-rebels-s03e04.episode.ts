import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS03e04 = {
  id: "01a18853-ddfe-74b8-9b0f-fb734eca7fee",
  type: "page-type/episode",
  slug: "star-wars-rebels-s03e04",
  description:
    "Hera's rebel supply mission to Ryloth becomes personal when she and the Ghost crew brave overwhelming Imperial forces to recover a memento from her ancestral home.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-3"],
  position: 4,
  publishedAt: "2016-10-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1228438",
      externalLink: "https://www.themoviedb.org/tv/60554/season/3/episode/4",
    },
  ],
  title: "Hera's Heroes",
  episodeType: "standard",
  stillPath: "/9ih28BwUu5tRrStey3Ab7ZisOPw.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
