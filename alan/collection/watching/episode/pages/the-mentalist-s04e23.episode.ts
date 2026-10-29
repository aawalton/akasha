import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMentalistS04e23 = {
  id: "01a18880-75ea-7c26-a1ee-40655a6d2c47",
  type: "page-type/episode",
  slug: "the-mentalist-s04e23",
  description:
    "On the ninth anniversary of his wife and daughter's death, Jane receives a message from Red John, causing Jane to lose focus on his current case and put the investigation and his career at the CBI in jeopardy",
  ownLength: 42,
  ownProgress: 42,
  partOfCollections: ["season/the-mentalist-season-4"],
  position: 23,
  publishedAt: "2012-05-10",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "367786",
      externalLink: "https://www.themoviedb.org/tv/5920/season/4/episode/23",
    },
  ],
  title: "Red Rover, Red Rover",
  episodeType: "standard",
  stillPath: "/boPDiRtWITkSHnRSy4SlxULQ1PU.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T16:31:22.596Z",
  updatedAt: "2026-10-29T16:31:22.596Z",
} as const satisfies Episode
