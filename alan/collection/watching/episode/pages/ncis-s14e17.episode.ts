import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS14e17 = {
  id: "01a1884b-ef75-72ad-87f8-a16d531191e8",
  type: "page-type/episode",
  slug: "ncis-s14e17",
  description:
    "McGee discovers his apartment has been torn apart by a robber trying to locate an item of great value hidden somewhere by the convicted criminal who previously owned the unit.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-14"],
  position: 17,
  publishedAt: "2017-03-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1273036",
      externalLink: "https://www.themoviedb.org/tv/4614/season/14/episode/17",
    },
  ],
  title: "What Lies Above",
  episodeType: "standard",
  stillPath: "/fmK5YuTEaCnpfNkqIGuq2q49BvC.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
