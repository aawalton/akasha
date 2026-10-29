import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS04e14 = {
  id: "01a18853-ddff-7a0f-a795-d111f631dca9",
  type: "page-type/episode",
  slug: "star-wars-rebels-s04e14",
  description: "The Ghost hatches a plan to free Lothal, though a traitor may be in their midst.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-4"],
  position: 14,
  publishedAt: "2018-03-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1447560",
      externalLink: "https://www.themoviedb.org/tv/60554/season/4/episode/14",
    },
  ],
  title: "A Fool's Hope",
  episodeType: "standard",
  stillPath: "/5DwgoAoK797Pt70cLIyochp9dec.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
