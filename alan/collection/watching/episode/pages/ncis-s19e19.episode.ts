import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS19e19 = {
  id: "01a1884b-ef80-77cd-afa1-5fef570b3af0",
  type: "page-type/episode",
  slug: "ncis-s19e19",
  description:
    "NCIS investigates a ring of clever teenage partygoers when a string of break-ins takes place at Marine Base Quantico.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-19"],
  position: 19,
  publishedAt: "2022-05-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3673837",
      externalLink: "https://www.themoviedb.org/tv/4614/season/19/episode/19",
    },
  ],
  title: "The Brat Pack",
  episodeType: "standard",
  stillPath: "/fNcAyfX3pYedbFZWpqvDf1ks3tm.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
