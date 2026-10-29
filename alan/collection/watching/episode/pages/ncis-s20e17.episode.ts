import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS20e17 = {
  id: "01a1884b-ef82-7534-bb82-b41b3e1344a4",
  type: "page-type/episode",
  slug: "ncis-s20e17",
  description:
    "NCIS works to solve the murder of a Marine private who appears to have been killed for helping an Afghan refugee.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-20"],
  position: 17,
  publishedAt: "2023-03-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4291801",
      externalLink: "https://www.themoviedb.org/tv/4614/season/20/episode/17",
    },
  ],
  title: "Stranger in a Strange Land",
  episodeType: "standard",
  stillPath: "/pVc9ZvqaBSKtAJBcSb7hvkt4Yun.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
