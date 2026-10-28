import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blackButlerS03e07 = {
  id: "01a183d8-99a7-788d-b0c0-9ed695c421dd",
  type: "page-type/episode",
  slug: "black-butler-s03e07",
  description:
    "Before they pay the baron a visit, Sebastian decides to take some advice from Soma.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/black-butler-season-3"],
  position: 7,
  publishedAt: "2014-08-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "997392",
      externalLink: "https://www.themoviedb.org/tv/50712/season/3/episode/7",
    },
  ],
  title: "His Butler, Careful Tending",
  episodeType: "standard",
  stillPath: "/9KWi73s2DzFbK74UwDhVVrXsMBV.jpg",
  voteAverage: 6,
  createdAt: "2026-10-28T18:49:32.837Z",
  updatedAt: "2026-10-28T18:49:32.837Z",
} as const satisfies Episode
