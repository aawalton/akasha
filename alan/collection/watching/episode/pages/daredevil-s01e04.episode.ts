import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const daredevilS01e04 = {
  id: "01a18845-e1fa-7b85-b5e0-ca8f25b35764",
  type: "page-type/episode",
  slug: "daredevil-s01e04",
  description: "Matt Murdock and Wilson Fisk's darker halves fight to be unleashed.",
  ownLength: 55,
  ownProgress: 0,
  partOfCollections: ["season/marvel-s-daredevil-season-1"],
  position: 4,
  publishedAt: "2025-03-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5688004",
      externalLink: "https://www.themoviedb.org/tv/202555/season/1/episode/4",
    },
  ],
  title: "Sic Semper Systema",
  episodeType: "standard",
  stillPath: "/2R9R09snm4TxuDYVvYexiosMBaf.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:27:23.641Z",
  updatedAt: "2026-10-29T15:27:23.641Z",
} as const satisfies Episode
