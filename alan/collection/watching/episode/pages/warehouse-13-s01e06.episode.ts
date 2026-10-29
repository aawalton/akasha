import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const warehouse13S01e06 = {
  id: "01a18859-886f-7143-be59-e212ba31b474",
  type: "page-type/episode",
  slug: "warehouse-13-s01e06",
  description:
    "Pete and Myka take on a previous agent's assignment after the man's corpse turns up in the basement of a St. Louis police station.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/warehouse-13-season-1"],
  position: 6,
  publishedAt: "2009-08-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "541567",
      externalLink: "https://www.themoviedb.org/tv/15819/season/1/episode/6",
    },
  ],
  title: "Burnout",
  episodeType: "standard",
  stillPath: "/7tHY5tWqenTzocAaL7n9J5gkRup.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:48:51.438Z",
  updatedAt: "2026-10-29T15:48:51.438Z",
} as const satisfies Episode
