import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsResistanceS01e02 = {
  id: "01a18853-f9af-7525-89e3-7a4e8f8ea810",
  type: "page-type/episode",
  slug: "star-wars-resistance-s01e02",
  description:
    "Kaz and BB-8 uncover information on an imminent pirate attack and must find a way to stop it.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-resistance-season-1"],
  position: 2,
  publishedAt: "2018-10-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1589107",
      externalLink: "https://www.themoviedb.org/tv/79093/season/1/episode/2",
    },
  ],
  title: "The Triple Dark",
  episodeType: "standard",
  stillPath: "/1Zuv578W0h6hbdqNRZb4CqCEJcV.jpg",
  voteAverage: 5.9,
  createdAt: "2026-10-29T15:42:47.214Z",
  updatedAt: "2026-10-29T15:42:47.214Z",
} as const satisfies Episode
