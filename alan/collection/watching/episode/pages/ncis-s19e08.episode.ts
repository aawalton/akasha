import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS19e08 = {
  id: "01a1884b-ef7d-7e22-84eb-c4afc2461c85",
  type: "page-type/episode",
  slug: "ncis-s19e08",
  description:
    "NCIS investigates the case of a Navy reservist whose body is found in a beat-up car at the end of a gun range.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-19"],
  position: 8,
  publishedAt: "2021-11-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3248852",
      externalLink: "https://www.themoviedb.org/tv/4614/season/19/episode/8",
    },
  ],
  title: "Peacekeeper",
  episodeType: "standard",
  stillPath: "/k2LvucMkBeGsXUTSkSzT6Vs7BtH.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
