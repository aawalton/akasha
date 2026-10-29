import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS20e20 = {
  id: "01a1884b-ef82-74d2-bdcb-70da02d96353",
  type: "page-type/episode",
  slug: "ncis-s20e20",
  description:
    "NCIS works to solve the murder of a senator’s daughter who has a rebellious reputation and large online following.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-20"],
  position: 20,
  publishedAt: "2023-05-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4291828",
      externalLink: "https://www.themoviedb.org/tv/4614/season/20/episode/20",
    },
  ],
  title: "Second Opinion",
  episodeType: "standard",
  stillPath: "/6qlyhwRxjALy9WmDujKaFC5lpl8.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
