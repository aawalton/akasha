import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS02e05 = {
  id: "01a18853-ddfd-7951-895f-6afa2ca69b16",
  type: "page-type/episode",
  slug: "star-wars-rebels-s02e05",
  description:
    "Since the rebels are in need of a new ship in order to overcome an Imperial blockade, Hera embarks on a dangerous mission to meet an eccentric starship engineer and manages to gain his trust. But will that be enough to get a ship from him?",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-2"],
  position: 5,
  publishedAt: "2015-11-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1135846",
      externalLink: "https://www.themoviedb.org/tv/60554/season/2/episode/5",
    },
  ],
  title: "Wings of the Master",
  episodeType: "standard",
  stillPath: "/mCfYLQ0Y6S0ZxziecEqmogcRETo.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
