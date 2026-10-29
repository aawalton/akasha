import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const wednesdayS02e01 = {
  id: "01a18881-232e-7376-9ec4-50c02a4b5ec0",
  type: "page-type/episode",
  slug: "wednesday-s02e01",
  description:
    "After a productive summer break, Wednesday returns to Nevermore as a grudging campus celebrity — and the target of a dangerous stalker.",
  ownLength: 61,
  ownProgress: 61,
  partOfCollections: ["season/wednesday-season-2"],
  position: 1,
  publishedAt: "2025-08-06",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6165591",
      externalLink: "https://www.themoviedb.org/tv/119051/season/2/episode/1",
    },
  ],
  title: "Here We Woe Again",
  episodeType: "standard",
  stillPath: "/1L5TJquVHoCp19w5tKy48DfcCnZ.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T16:32:06.957Z",
  updatedAt: "2026-10-29T16:32:06.957Z",
} as const satisfies Episode
