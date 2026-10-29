import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS16e03 = {
  id: "01a1884b-ef77-7e9d-9ff7-913b5bd241c0",
  type: "page-type/episode",
  slug: "ncis-s16e03",
  description:
    "One of the NCIS agents is starstruck after the team investigates an explosion outside the home of Navy Petty Officer First Class Todd Nicholas and his wife, popular reality TV star Sheba Nicholas.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-16"],
  position: 3,
  publishedAt: "2018-10-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1575708",
      externalLink: "https://www.themoviedb.org/tv/4614/season/16/episode/3",
    },
  ],
  title: "Boom",
  episodeType: "standard",
  stillPath: "/6AUppQ0BulJHDskuLmoTAmuto2.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
