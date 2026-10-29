import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS01e13 = {
  id: "01a18853-ddfc-7fc8-84e1-285412309001",
  type: "page-type/episode",
  slug: "star-wars-rebels-s01e13",
  description: "The crew has to go through many obstacles to save Kanan.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-1"],
  position: 13,
  publishedAt: "2015-03-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1044678",
      externalLink: "https://www.themoviedb.org/tv/60554/season/1/episode/13",
    },
  ],
  title: "Fire Across the Galaxy",
  episodeType: "finale",
  stillPath: "/zRXqj6ziU6p21rnIhWcTTd8x0C4.jpg",
  voteAverage: 8.8,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
