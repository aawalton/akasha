import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const daredevilS01e02 = {
  id: "01a18845-e1f9-7045-834a-d3c9ff9315e7",
  type: "page-type/episode",
  slug: "daredevil-s01e02",
  description:
    "Matt Murdock gets a new client who's more than he claims to be. Fisk learns the power of optics.",
  ownLength: 50,
  ownProgress: 0,
  partOfCollections: ["season/marvel-s-daredevil-season-1"],
  position: 2,
  publishedAt: "2025-03-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5688002",
      externalLink: "https://www.themoviedb.org/tv/202555/season/1/episode/2",
    },
  ],
  title: "Optics",
  episodeType: "standard",
  stillPath: "/qOJE3sylDFZpA8FzDkD9Z2sfAw8.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:27:23.641Z",
  updatedAt: "2026-10-29T15:27:23.641Z",
} as const satisfies Episode
