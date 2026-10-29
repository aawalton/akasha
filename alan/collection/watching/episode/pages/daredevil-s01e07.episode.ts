import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const daredevilS01e07 = {
  id: "01a18845-e1fa-7adc-8707-90b3bfad2667",
  type: "page-type/episode",
  slug: "daredevil-s01e07",
  description: "Daredevil is back and races Fisk to stop Muse from killing again.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/marvel-s-daredevil-season-1"],
  position: 7,
  publishedAt: "2025-04-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5688007",
      externalLink: "https://www.themoviedb.org/tv/202555/season/1/episode/7",
    },
  ],
  title: "Art for Art's Sake",
  episodeType: "standard",
  stillPath: "/tJelpQdDGxnFK4xSyg5ajvbMo3q.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:27:23.641Z",
  updatedAt: "2026-10-29T15:27:23.641Z",
} as const satisfies Episode
