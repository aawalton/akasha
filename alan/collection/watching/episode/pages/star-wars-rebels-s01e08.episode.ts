import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS01e08 = {
  id: "01a18853-ddfc-7c15-8e13-fc62c66f724e",
  type: "page-type/episode",
  slug: "star-wars-rebels-s01e08",
  description: "Ezra must face a great challenge as part of his growth as a member of the team.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-1"],
  position: 8,
  publishedAt: "2015-01-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1033050",
      externalLink: "https://www.themoviedb.org/tv/60554/season/1/episode/8",
    },
  ],
  title: "Path of the Jedi",
  episodeType: "standard",
  stillPath: "/jFGeHNLszkAwj8Xu9b5Cxg2LGAV.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
