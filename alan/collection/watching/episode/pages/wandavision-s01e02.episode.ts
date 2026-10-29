import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const wandavisionS01e02 = {
  id: "01a18881-0937-7ff1-8fdd-7738d1f5ea18",
  type: "page-type/episode",
  slug: "wandavision-s01e02",
  description:
    "In an effort to fit in, Wanda and Vision perform a magic act in their community talent show.",
  ownLength: 39,
  ownProgress: 39,
  partOfCollections: ["season/wandavision-miniseries"],
  position: 2,
  publishedAt: "2021-01-15",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2293605",
      externalLink: "https://www.themoviedb.org/tv/85271/season/1/episode/2",
    },
  ],
  title: "Don't Touch That Dial",
  episodeType: "standard",
  stillPath: "/3KZQbfi6SE5rTA5ysh8FvOMBuUN.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T16:32:00.311Z",
  updatedAt: "2026-10-29T16:32:00.311Z",
} as const satisfies Episode
