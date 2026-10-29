import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS16e01 = {
  id: "01a1884b-ef77-7e5c-bd61-356eb40c1beb",
  type: "page-type/episode",
  slug: "ncis-s16e01",
  description:
    "One month after Director Vance was kidnapped, Gibbs is assigned the role of acting director in his absence while the team searches worldwide for his whereabouts.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-16"],
  position: 1,
  publishedAt: "2018-09-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1518060",
      externalLink: "https://www.themoviedb.org/tv/4614/season/16/episode/1",
    },
  ],
  title: "Destiny's Child",
  episodeType: "standard",
  stillPath: "/2OfDpRIiBnfdw1di5HU6Oj1hZMb.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
