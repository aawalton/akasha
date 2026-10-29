import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS02e08 = {
  id: "01a18853-ddfd-7f99-8532-9245daac63e4",
  type: "page-type/episode",
  slug: "star-wars-rebels-s02e08",
  description:
    "The rebels learn that the Inquisitors are seeking out Force-sensitive children, and they work together to protect the young ones from the Inquisitors' pursuit.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-2"],
  position: 8,
  publishedAt: "2015-12-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1142189",
      externalLink: "https://www.themoviedb.org/tv/60554/season/2/episode/8",
    },
  ],
  title: "The Future of the Force",
  episodeType: "standard",
  stillPath: "/27ONParPxPgjZw1WJrG4z2RU9Oz.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
