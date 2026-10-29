import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS03e17 = {
  id: "01a18853-ddfe-73f0-becd-0fa6d83e1b89",
  type: "page-type/episode",
  slug: "star-wars-rebels-s03e17",
  description:
    "The Ghost crew must escort Senator Mon Mothma, now wanted by the Empire, to a meeting that can change the galaxy.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-3"],
  position: 17,
  publishedAt: "2017-03-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1275774",
      externalLink: "https://www.themoviedb.org/tv/60554/season/3/episode/17",
    },
  ],
  title: "Secret Cargo",
  episodeType: "standard",
  stillPath: "/939CVcXzNWtK0PEVry4zsWf5m6l.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
