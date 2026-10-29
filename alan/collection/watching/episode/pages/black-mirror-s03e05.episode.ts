import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blackMirrorS03e05 = {
  id: "01a18843-982b-7845-bd26-e9e07837d5a4",
  type: "page-type/episode",
  slug: "black-mirror-s03e05",
  description:
    "After his first battle with an elusive enemy, a soldier begins experiencing unfamiliar sensations and strange technical glitches.",
  ownLength: 60,
  ownProgress: 0,
  partOfCollections: ["season/black-mirror-season-3"],
  position: 5,
  publishedAt: "2016-10-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1226010",
      externalLink: "https://www.themoviedb.org/tv/42009/season/3/episode/5",
    },
  ],
  title: "Men Against Fire",
  episodeType: "standard",
  stillPath: "/A4g3nH0kYQpqHv1oHBXuTgRgT5u.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:24:53.673Z",
  updatedAt: "2026-10-29T15:24:53.673Z",
} as const satisfies Episode
