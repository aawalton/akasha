import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const bleachS01e31 = {
  id: "01a183d3-f47a-70ca-8110-47312e5fef7d",
  type: "page-type/episode",
  slug: "bleach-s01e31",
  description: "Ichigo Kurosaki and 6th Division Lieutenant Renji Abarai conclude their rematch.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/bleach-season-1"],
  position: 31,
  publishedAt: "2005-05-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1517150",
      externalLink: "https://www.themoviedb.org/tv/30984/season/1/episode/31",
    },
  ],
  title: "The Resolution to Kill",
  episodeType: "standard",
  stillPath: "/5nL3zns8VIRdQqS7hcf4B0rQgsX.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-28T18:44:28.395Z",
  updatedAt: "2026-10-28T18:44:28.395Z",
} as const satisfies Episode
