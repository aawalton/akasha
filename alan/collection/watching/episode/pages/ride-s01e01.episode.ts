import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const rideS01e01 = {
  id: "01a18851-6999-7818-bb70-b79fa99940c5",
  type: "page-type/episode",
  slug: "ride-s01e01",
  description:
    "Following a tragic event, a renowned rodeo family must pick up the pieces to save their Colorado ranch.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ride-season-1"],
  position: 1,
  publishedAt: "2023-03-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3986307",
      externalLink: "https://www.themoviedb.org/tv/211562/season/1/episode/1",
    },
  ],
  title: "Legend of the Fall",
  episodeType: "standard",
  stillPath: "/zOUxUdR9uSqgJlhuIqDWKMn8MJQ.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:39:59.257Z",
  updatedAt: "2026-10-29T15:39:59.257Z",
} as const satisfies Episode
