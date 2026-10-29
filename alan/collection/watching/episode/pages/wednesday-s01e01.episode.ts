import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const wednesdayS01e01 = {
  id: "01a18881-232d-77af-a040-5d8f8470ea76",
  type: "page-type/episode",
  slug: "wednesday-s01e01",
  description:
    "When a deliciously wicked prank gets Wednesday expelled, her parents ship her off to Nevermore Academy, the boarding school where they fell in love.",
  ownLength: 60,
  ownProgress: 60,
  partOfCollections: ["season/wednesday-season-1"],
  position: 1,
  publishedAt: "2022-11-23",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2738253",
      externalLink: "https://www.themoviedb.org/tv/119051/season/1/episode/1",
    },
  ],
  title: "Wednesday's Child Is Full of Woe",
  episodeType: "standard",
  stillPath: "/vaoNDFmj7DQH7PpAy9YWgLVylPP.jpg",
  voteAverage: 8.45,
  createdAt: "2026-10-29T16:32:06.957Z",
  updatedAt: "2026-10-29T16:32:06.957Z",
} as const satisfies Episode
