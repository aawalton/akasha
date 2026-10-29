import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const wednesdayS01e02 = {
  id: "01a18881-232d-78cc-8166-21402e59a641",
  type: "page-type/episode",
  slug: "wednesday-s01e02",
  description:
    "The sheriff questions Wednesday about the night's strange happenings. Later, Wednesday faces off against a fierce rival in the cutthroat Poe Cup race.",
  ownLength: 49,
  ownProgress: 49,
  partOfCollections: ["season/wednesday-season-1"],
  position: 2,
  publishedAt: "2022-11-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3901538",
      externalLink: "https://www.themoviedb.org/tv/119051/season/1/episode/2",
    },
  ],
  title: "Woe Is the Loneliest Number",
  episodeType: "standard",
  stillPath: "/nSGdaI0sDBqgMMuskIKNNT1KbS8.jpg",
  voteAverage: 8.345,
  createdAt: "2026-10-29T16:32:06.957Z",
  updatedAt: "2026-10-29T16:32:06.957Z",
} as const satisfies Episode
