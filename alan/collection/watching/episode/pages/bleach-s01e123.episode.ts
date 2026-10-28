import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const bleachS01e123 = {
  id: "01a183d3-f46e-74eb-8466-00a8c556dff6",
  type: "page-type/episode",
  slug: "bleach-s01e123",
  description: "Ichigo Kurosaki begins training to control his Hollowfication.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/bleach-season-1"],
  position: 123,
  publishedAt: "2007-04-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1517261",
      externalLink: "https://www.themoviedb.org/tv/30984/season/1/episode/123",
    },
  ],
  title: "Ichigo, Complete Hollowification!?",
  episodeType: "standard",
  stillPath: "/vdMAlyja9xQ6I1teVkn2NpIC7Vi.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-28T18:44:28.395Z",
  updatedAt: "2026-10-28T18:44:28.395Z",
} as const satisfies Episode
