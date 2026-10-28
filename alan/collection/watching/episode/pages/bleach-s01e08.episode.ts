import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const bleachS01e08 = {
  id: "01a183d3-f46c-7388-ba98-194f464a590d",
  type: "page-type/episode",
  slug: "bleach-s01e08",
  description: "Ichigo Kurosaki goes to his mother's grave with the rest of his family.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/bleach-season-1"],
  position: 8,
  publishedAt: "2004-11-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "750580",
      externalLink: "https://www.themoviedb.org/tv/30984/season/1/episode/8",
    },
  ],
  title: "June 17, Memories in the Rain",
  episodeType: "standard",
  stillPath: "/37Uy7lDRIUljkQ9g9RXlcrEHGHn.jpg",
  voteAverage: 8,
  createdAt: "2026-10-28T18:44:28.395Z",
  updatedAt: "2026-10-28T18:44:28.395Z",
} as const satisfies Episode
