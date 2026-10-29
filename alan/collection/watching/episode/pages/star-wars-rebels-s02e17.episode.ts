import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS02e17 = {
  id: "01a18853-ddfd-7cf6-9cdf-3efc908a9d81",
  type: "page-type/episode",
  slug: "star-wars-rebels-s02e17",
  description:
    "When Chopper gets left behind at an Imperial outpost, he forms an unlikely friendship with an Imperial droid, and discovers a base location for the rebels.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-2"],
  position: 17,
  publishedAt: "2016-03-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1174483",
      externalLink: "https://www.themoviedb.org/tv/60554/season/2/episode/17",
    },
  ],
  title: "The Forgotten Droid",
  episodeType: "standard",
  stillPath: "/vsA5f4j6oumKg36vIN7aDX1Xztu.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
